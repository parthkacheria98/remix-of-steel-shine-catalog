import { Link } from "react-router-dom";
import { Category } from "@/data/api";
import { imageForCategory } from "@/data/categoryImages";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const toneClass = category.brandSlug === "deep" ? "text-deep" : "text-angel";
  return (
    <Link to={`/categories/${category.brandSlug}/${category.slug}`} className="group block">
      <div className="relative aspect-[4/5] bg-muted overflow-hidden border border-border transition-shadow duration-300 hover:shadow-hover">
        <img
          src={imageForCategory(category.slug)}
          alt={category.name}
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.02] transition-colors duration-300" />
      </div>
      <div className="mt-4 space-y-1">
        <p className={`text-[10px] uppercase tracking-[0.2em] font-bold ${toneClass}`}>{category.brand}</p>
        <h3 className="text-lg font-heading font-semibold tracking-tight group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {category.productCount} {category.productCount === 1 ? "product" : "products"}
        </p>
      </div>
    </Link>
  );
};
