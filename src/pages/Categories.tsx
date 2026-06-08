import { CategoryCard } from "@/components/CategoryCard";
import { useCatalog } from "@/data/useCatalog";

const CategoriesPage = () => {
  const { data, isLoading, error } = useCatalog();
  const categories = data?.categories ?? [];

  const deepCats = categories.filter((c) => c.brandSlug === "deep");
  const angelCats = categories.filter((c) => c.brandSlug === "angel");

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-primary font-mono text-xs tracking-tighter uppercase">Ratandeep Houseware - Full Range</span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mt-2">Catalogue</h1>
        <p className="text-muted-foreground mt-4 max-w-lg">
          Browse the complete range across our two ranges - <span className="text-deep font-semibold">Deep</span> and{" "}
          <span className="text-angel font-semibold">Angel</span>.
        </p>
      </div>

      {isLoading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-destructive">Failed to load.</p>}

      <div className="space-y-16">
          {[
            { name: "Deep", slug: "deep", tone: "text-deep", cats: deepCats },
            { name: "Angel", slug: "angel", tone: "text-angel", cats: angelCats },
          ].map((b) =>
            b.cats.length > 0 ? (
              <section key={b.slug}>
                <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-border">
                  <h2 className={`text-2xl md:text-3xl font-heading font-bold tracking-tighter ${b.tone}`}>
                    {b.name}
                  </h2>
                  <span className="text-xs text-muted-foreground font-mono">
                    {b.cats.length} categor{b.cats.length === 1 ? "y" : "ies"}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                  {b.cats.map((cat) => (
                    <CategoryCard key={`${b.slug}-${cat.slug}`} category={cat} />
                  ))}
                </div>
              </section>
            ) : null
          )}
      </div>
    </div>
  );
};

export default CategoriesPage;
