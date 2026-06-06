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
  images?: unknown[];
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

// Category = trailing keyword of Item_Name (e.g. "Bidding Dabba" -> "Dabba",
// "Rolling Outer Clip Tiffin" -> "Tiffin"). Backend-agnostic heuristic.
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

  // Group rows -> products by (brand, item_name)
  const productMap = new Map<string, Product>();
  for (const r of published) {
    const brand = r.Brand;
    const brandSlug = slugify(brand);
    const category = deriveCategory(r.Item_Name);
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
