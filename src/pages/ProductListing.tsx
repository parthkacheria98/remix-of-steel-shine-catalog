import { useParams, Link } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { useCatalog } from "@/data/useCatalog";

const ProductListing = () => {
  const { brand, slug } = useParams<{ brand: string; slug: string }>();
  const { data, isLoading } = useCatalog();

  const category = (data?.categories ?? []).find((c) => c.slug === slug && c.brandSlug === brand);
  const products = (data?.products ?? []).filter((p) => p.categorySlug === slug && p.brandSlug === brand);

  if (isLoading) {
    return <div className="max-w-[1200px] mx-auto px-6 py-20 text-muted-foreground">Loading…</div>;
  }

  if (!category) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-heading font-bold">Category not found</h1>
        <Link to="/categories" className="text-primary mt-4 inline-block">
          ← Back to catalogue
        </Link>
      </div>
    );
  }

  const toneClass = category.brandSlug === "deep" ? "text-deep" : "text-angel";

  return (
    <div data-brand={category.brandSlug} className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="mb-4">
        <Link to="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← All Categories
        </Link>
      </div>
      <div className="mb-12">
        <p className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-2 ${toneClass}`}>{category.brand}</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter">{category.name}</h1>
        <p className="text-muted-foreground mt-4 max-w-lg">
          {category.productCount} {category.productCount === 1 ? "product" : "products"} in this range.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
