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
    const base = DIRECTUS_URL.replace(/\/$/, '').replace(/\/items\/[^/?#]+$/i, '');

    // Asset proxy: /catalog/asset/<file-id> -> Directus /assets/<id>
    // Needed because Directus is served over http; browsers block mixed content from https pages.
    const assetMatch = url.pathname.match(/\/asset\/([A-Za-z0-9-]+)$/);
    if (assetMatch) {
      const fileId = assetMatch[1];
      const upstream = `${base}/assets/${fileId}`;
      const res = await fetch(upstream, { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } });
      const buf = await res.arrayBuffer();
      return new Response(buf, {
        status: res.status,
        headers: {
          ...corsHeaders,
          'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

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
    // Expand M2M images junction to file UUIDs so client can build asset URLs.
    const fields = collection === 'Products'
      ? '*,images.directus_files_id'
      : '*';
    const upstream = `${base}/items/${collection}?limit=-1&fields=${encodeURIComponent(fields)}`;
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
