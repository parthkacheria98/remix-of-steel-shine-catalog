import { supabase } from "@/integrations/supabase/client";

export interface RawProductRow {
  id: number;
  status: string;
  Item_Name: string;
  Brand: "Deep" | "Angel" | string;
  Design: string | null;
  SKU_Code: string | null;
  Capacity: string | null;
  Weight: string | null;
  Size: string | null;
  Category?: string | null;
  images?: Array<{ directus_files_id: string } | string> | null;
}

export interface Variant {
  id: number;
  design: string;
  size: string;
  capacity: string;
  weight: string;
  sku: string;
}

export interface Product {
  id: string; // brand-slug + item-slug
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  category: string;
  categorySlug: string;
  designs: string[];
  sizes: string[];
  variants: Variant[];
  images: string[];
}

export interface Category {
  name: string;
  slug: string;
  brand: string;
  brandSlug: string;
  productCount: number;
}

export interface Brand {
  name: string;
  slug: string;
}

export interface Catalog {
  brands: Brand[];
  categories: Category[];
  products: Product[];
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Fallback only: trailing keyword of Item_Name if Category column is missing.
const deriveCategory = (itemName: string) => {
  const parts = itemName.trim().split(/\s+/);
  return parts[parts.length - 1] || itemName;
};

const clean = (v: string | null | undefined) => {
  if (!v) return "";
  const s = String(v).trim();
  if (!s || s === "#NA" || s.toLowerCase() === "n/a") return "";
  return s;
};

export function transform(rows: RawProductRow[]): Catalog {
  const published = rows.filter((r) => r.status === "published");

  // First pass: collect image file IDs by Item_Name (case-insensitive).
  // If any single row with a given Item_Name has images, share them with all
  // products of that same name.
  const imagesByName = new Map<string, string[]>();
  for (const r of published) {
    const raw = Array.isArray(r.images) ? r.images : [];
    if (raw.length === 0) continue;
    const ids = raw
      .map((it) => (typeof it === "string" ? it : it?.directus_files_id))
      .filter((x): x is string => !!x);
    if (ids.length === 0) continue;
    const key = r.Item_Name.trim().toLowerCase();
    const existing = imagesByName.get(key) ?? [];
    for (const id of ids) if (!existing.includes(id)) existing.push(id);
    imagesByName.set(key, existing);
  }

  // Group rows -> products by (brand, item_name)
  const productMap = new Map<string, Product>();
  for (const r of published) {
    const brand = r.Brand;
    const brandSlug = slugify(brand);
    const category = clean(r.Category) || deriveCategory(r.Item_Name);
    const categorySlug = slugify(category);
    const itemSlug = slugify(r.Item_Name);
    const key = `${brandSlug}/${itemSlug}`;

    let p = productMap.get(key);
    if (!p) {
      p = {
        id: key,
        slug: itemSlug,
        name: r.Item_Name,
        brand,
        brandSlug,
        category,
        categorySlug,
        designs: [],
        sizes: [],
        variants: [],
        images: imagesByName.get(r.Item_Name.trim().toLowerCase()) ?? [],
      };
      productMap.set(key, p);
    }

    const variant: Variant = {
      id: r.id,
      design: clean(r.Design),
      size: clean(r.Size),
      capacity: clean(r.Capacity),
      weight: clean(r.Weight),
      sku: clean(r.SKU_Code),
    };
    p.variants.push(variant);
    if (variant.design && !p.designs.includes(variant.design)) p.designs.push(variant.design);
    if (variant.size && !p.sizes.includes(variant.size)) p.sizes.push(variant.size);
  }

  const products = Array.from(productMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  // Categories per brand
  const catMap = new Map<string, Category>();
  for (const p of products) {
    const key = `${p.brandSlug}/${p.categorySlug}`;
    const existing = catMap.get(key);
    if (existing) existing.productCount += 1;
    else
      catMap.set(key, {
        name: p.category,
        slug: p.categorySlug,
        brand: p.brand,
        brandSlug: p.brandSlug,
        productCount: 1,
      });
  }
  const categories = Array.from(catMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  const brandSet = new Map<string, Brand>();
  for (const p of products) brandSet.set(p.brandSlug, { name: p.brand, slug: p.brandSlug });
  const brands = Array.from(brandSet.values());

  return { brands, categories, products };
}

export async function fetchCatalog(): Promise<Catalog> {
  const { data, error } = await supabase.functions.invoke("catalog", { method: "GET" });
  if (error) throw error;
  const rows = (data?.data ?? []) as RawProductRow[];
  return transform(rows);
}

const CATALOG_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/catalog`;
export const assetUrl = (fileId: string) => `${CATALOG_BASE}/asset/${fileId}`;

