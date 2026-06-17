import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductGallery } from "@/components/ProductGallery";
import { VariantList } from "@/components/VariantList";
import { FeatureList } from "@/components/FeatureList";
import { ProductCard } from "@/components/ProductCard";
import { useCatalog } from "@/data/useCatalog";
import { imageForProduct } from "@/data/categoryImages";
import { assetUrl } from "@/data/api";

const ProductDetail = () => {
  const { brand, slug } = useParams<{ brand: string; slug: string }>();
  const { data, isLoading } = useCatalog();

  const product = (data?.products ?? []).find((p) => p.slug === slug && p.brandSlug === brand);

  if (isLoading) {
    return <div className="max-w-[1200px] mx-auto px-6 py-20 text-muted-foreground">Loading…</div>;
  }

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-heading font-bold">Product not found</h1>
        <Link to="/categories" className="text-primary mt-4 inline-block">
          ← Browse catalogue
        </Link>
      </div>
    );
  }

  const related = (data?.products ?? [])
    .filter((p) => p.categorySlug === product.categorySlug && p.brandSlug === product.brandSlug && p.id !== product.id)
    .slice(0, 4);

  const features = [
    "Food-grade stainless steel",
    product.designs.length > 0 ? `${product.designs.length} finish${product.designs.length === 1 ? "" : "es"} available` : null,
    product.sizes.length > 0 ? `${product.sizes.length} size${product.sizes.length === 1 ? "" : "s"} available` : null,
    "Durable, hygienic, long lasting",
  ].filter(Boolean) as string[];

  const galleryImages = product.images.length > 0
    ? product.images.map(assetUrl)
    : [imageForProduct(product.categorySlug)];
  const toneClass = product.brandSlug === "deep" ? "text-deep" : "text-angel";

  return (
    <div data-brand={product.brandSlug} className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="mb-6">
        <Link
          to={`/categories/${product.brandSlug}/${product.categorySlug}`}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← {product.category}
        </Link>
      </div>

      <motion.div
        className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <ProductGallery images={galleryImages} productName={product.name} blend={product.images.length === 0} />

        <div className="space-y-8">
          <div>
            <p className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-2 ${toneClass}`}>
              {product.brand} · {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter">{product.name}</h1>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Premium {product.category.toLowerCase()} from the {product.brand} range by Ratandeep Houseware.
              Available in {product.sizes.length} size{product.sizes.length === 1 ? "" : "s"}
              {product.designs.length ? ` and ${product.designs.length} finish${product.designs.length === 1 ? "" : "es"}` : ""}.
            </p>
          </div>

          <VariantList variants={product.variants} />
          <FeatureList features={features} />

          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 font-heading font-bold uppercase tracking-widest text-xs hover:bg-foreground transition-colors duration-300"
          >
            Enquire Now
          </Link>
        </div>
      </motion.div>

      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl font-heading font-bold tracking-tighter mb-8">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
