import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { useBrand } from "@/context/BrandContext";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { brand, setBrand, label } = useBrand();

  const withBrand = (path: string) => `${path}?brand=${brand}`;
  const links = [
    { label: "Home", to: withBrand("/") },
    { label: "Categories", to: withBrand("/categories") },
    { label: "About", to: withBrand("/about") },
    { label: "Contact", to: withBrand("/contact") },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to={withBrand("/")} className="text-2xl font-heading font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm" />
            {label}
          </Link>

          <div className="hidden md:flex items-center gap-10 text-[13px] font-medium uppercase tracking-widest text-foreground/60">
            {links.map((item) => (
              <Link key={item.label} to={item.to} className="hover:text-primary transition-colors duration-200">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Brand switcher */}
            <div className="hidden sm:flex items-center border border-border rounded-full overflow-hidden text-[10px] font-bold uppercase tracking-widest">
              <button
                onClick={() => setBrand("deep")}
                className={`px-3 py-1.5 transition-colors ${
                  brand === "deep" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                Deep
              </button>
              <button
                onClick={() => setBrand("angel")}
                className={`px-3 py-1.5 transition-colors ${
                  brand === "angel" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                Angel
              </button>
            </div>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-background">
            <div className="max-w-[1200px] mx-auto px-6 py-4">
              <SearchBar onClose={() => setSearchOpen(false)} />
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2 sm:hidden">
                <button
                  onClick={() => setBrand("deep")}
                  className={`flex-1 px-3 py-2 text-xs font-bold uppercase tracking-widest border ${
                    brand === "deep" ? "bg-primary text-primary-foreground border-primary" : "border-border"
                  }`}
                >
                  Deep
                </button>
                <button
                  onClick={() => setBrand("angel")}
                  className={`flex-1 px-3 py-2 text-xs font-bold uppercase tracking-widest border ${
                    brand === "angel" ? "bg-primary text-primary-foreground border-primary" : "border-border"
                  }`}
                >
                  Angel
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="h-20" />
    </>
  );
};
