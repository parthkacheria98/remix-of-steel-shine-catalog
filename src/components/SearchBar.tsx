import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useCatalog } from "@/data/useCatalog";
import { imageForProduct } from "@/data/categoryImages";

interface SearchBarProps {
  onClose?: () => void;
}

export const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data } = useCatalog();

  const q = query.toLowerCase();
  const results =
    q.length > 1 && data
      ? data.products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.sizes.some((s) => s.toLowerCase().includes(q)) ||
              p.variants.some((v) => v.sku.toLowerCase().includes(q))
          )
          .slice(0, 8)
      : [];

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <Search size={18} className="text-muted-foreground" />
        <input
          autoFocus
          type="text"
          placeholder="Search by product, brand, category, size or SKU..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm py-1"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border shadow-medium z-50 max-h-80 overflow-y-auto">
          {results.map((p) => {
            const toneClass = p.brandSlug === "deep" ? "text-deep" : "text-angel";
            return (
              <button
                key={p.id}
                onClick={() => {
                  navigate(`/product/${p.brandSlug}/${p.slug}`);
                  onClose?.();
                }}
                className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center gap-4 border-b border-border last:border-0"
              >
                <img
                  src={imageForProduct(p.categorySlug)}
                  alt={p.name}
                  className="w-12 h-12 object-cover mix-blend-multiply bg-muted"
                />
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className={`text-[10px] uppercase tracking-widest font-bold ${toneClass}`}>
                    {p.brand} · {p.category}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
