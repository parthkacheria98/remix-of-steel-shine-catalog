import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCatalog } from "@/data/useCatalog";
import { Category, Product } from "@/data/api";

interface CatalogueHierarchyProps {
  onNavigate?: () => void;
  /** "compact" for navbar dropdown, "full" for in-page section */
  variant?: "compact" | "full";
}

const BRAND_ORDER: { slug: string; name: string; tone: "deep" | "angel" }[] = [
  { slug: "deep", name: "Deep", tone: "deep" },
  { slug: "angel", name: "Angel", tone: "angel" },
];

export const CatalogueHierarchy = ({ onNavigate, variant = "compact" }: CatalogueHierarchyProps) => {
  const { data, isLoading, error } = useCatalog();

  if (isLoading)
    return <p className="text-sm text-muted-foreground px-4 py-6">Loading catalogue…</p>;
  if (error)
    return <p className="text-sm text-destructive px-4 py-6">Failed to load catalogue.</p>;

  const categories = data?.categories ?? [];
  const products = data?.products ?? [];

  return (
    <Accordion
      type="multiple"
      defaultValue={variant === "full" ? ["brand-deep", "brand-angel"] : []}
      className="w-full"
    >
      {BRAND_ORDER.map((b) => {
        const brandCats = categories.filter((c) => c.brandSlug === b.slug);
        if (!brandCats.length) return null;
        const toneClass = b.tone === "deep" ? "text-deep" : "text-angel";
        const dotClass = b.tone === "deep" ? "bg-deep" : "bg-angel";
        return (
          <AccordionItem key={b.slug} value={`brand-${b.slug}`} className="border-border">
            <AccordionTrigger className="px-4 hover:no-underline">
              <span className={`flex items-center gap-3 font-heading font-bold uppercase tracking-widest text-sm ${toneClass}`}>
                <span className={`w-2.5 h-2.5 rounded-sm ${dotClass}`} />
                {b.name}
                <span className="text-[10px] text-muted-foreground font-medium tracking-wider">
                  {brandCats.length} categor{brandCats.length === 1 ? "y" : "ies"}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <Accordion type="multiple" className="border-l border-border ml-1.5 pl-3">
                {brandCats.map((cat: Category) => {
                  const catProducts = products.filter(
                    (p: Product) => p.brandSlug === b.slug && p.categorySlug === cat.slug
                  );
                  return (
                    <AccordionItem key={cat.slug} value={`${b.slug}-${cat.slug}`} className="border-border/60">
                      <AccordionTrigger className="py-2.5 hover:no-underline text-sm">
                        <span className="flex items-center justify-between w-full pr-2">
                          <Link
                            to={`/categories/${b.slug}/${cat.slug}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate?.();
                            }}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {cat.name}
                          </Link>
                          <span className="text-[10px] text-muted-foreground font-mono">
                            {cat.productCount}
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-2">
                        <ul className="flex flex-col gap-1 pl-1">
                          {catProducts.map((p) => (
                            <li key={p.id}>
                              <Link
                                to={`/product/${b.slug}/${p.slug}`}
                                onClick={onNavigate}
                                className="block py-1.5 px-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-sm transition-colors"
                              >
                                {p.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
