import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { CatalogueHierarchy } from "./CatalogueMenu";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const location = useLocation();
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCatalogueOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatalogueOpen(false);
      }
    };
    if (catalogueOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [catalogueOpen]);

  const links = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-heading font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm" />
            RATANDEEP HOUSEWARE
          </Link>

          <div className="hidden md:flex items-center gap-10 text-[13px] font-medium uppercase tracking-widest text-foreground/60">
            <Link to="/" className="hover:text-primary transition-colors duration-200">
              Home
            </Link>

            <div ref={catRef} className="relative">
              <button
                onClick={() => setCatalogueOpen((o) => !o)}
                className={`flex items-center gap-1 hover:text-primary transition-colors duration-200 ${
                  catalogueOpen ? "text-primary" : ""
                }`}
              >
                CATALOGUE
                <ChevronDown size={14} className={`transition-transform ${catalogueOpen ? "rotate-180" : ""}`} />
              </button>
              {catalogueOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[420px] bg-background border border-border shadow-hover max-h-[70vh] overflow-y-auto">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      Browse CATALOGUE
                    </p>
                  </div>
                  <CatalogueHierarchy onNavigate={() => setCatalogueOpen(false)} />
                  <div className="px-4 py-3 border-t border-border">
                    <Link
                      to="/categories"
                      onClick={() => setCatalogueOpen(false)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      View full catalogue →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {links.slice(1).map((item) => (
              <Link key={item.label} to={item.to} className="hover:text-primary transition-colors duration-200">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
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
          <div className="md:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
            <div className="px-2 py-4">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium hover:bg-muted rounded-sm"
              >
                Home
              </Link>
              <div className="border-t border-border my-2" />
              <p className="px-4 pt-2 pb-1 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                CATALOGUE
              </p>
              <CatalogueHierarchy onNavigate={() => setMobileOpen(false)} />
              <div className="border-t border-border my-2" />
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium hover:bg-muted rounded-sm"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium hover:bg-muted rounded-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
      <div className="h-20" />
    </>
  );
};
