import { CategoryCard } from "@/components/CategoryCard";
import { useCatalog } from "@/data/useCatalog";
import { useBrand } from "@/context/BrandContext";

const CategoriesPage = () => {
  const { data, isLoading, error } = useCatalog();
  const { brand, label } = useBrand();
  const categories = (data?.categories ?? []).filter((c) => c.brandSlug === brand);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-primary font-mono text-xs tracking-tighter uppercase">{label} — Full Range</span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mt-2">All Categories</h1>
        <p className="text-muted-foreground mt-4 max-w-lg">
          Browse the complete range of premium stainless steel kitchenware from {label}.
        </p>
      </div>
      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {error && <p className="text-destructive">Failed to load.</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
