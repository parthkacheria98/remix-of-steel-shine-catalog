import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const DIRECTUS_URL = Deno.env.get('DIRECTUS_URL');
const DIRECTUS_TOKEN = Deno.env.get('DIRECTUS_TOKEN');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
    return new Response(JSON.stringify({ error: 'Catalog backend not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(req.url);
    // Only allow read of the Products collection from the client.
    const collection = url.searchParams.get('collection') || 'Products';
    if (!/^[A-Za-z0-9_]+$/.test(collection)) {
      return new Response(JSON.stringify({ error: 'Invalid collection' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (req.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Normalize: accept either base URL or full /items/<collection> URL in the secret.
    const base = DIRECTUS_URL.replace(/\/$/, '').replace(/\/items\/[^/?#]+$/i, '');
    const upstream = `${base}/items/${collection}?limit=-1`;
    const res = await fetch(upstream, {
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
    });
    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Upstream error', detail: String(e) }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
