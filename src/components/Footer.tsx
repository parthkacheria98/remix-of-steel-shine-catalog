import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="border-t border-border bg-muted/50 mt-20">
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="text-2xl font-heading font-bold tracking-tighter flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded-sm" />
            RATANDEEP HOUSEWARE
          </Link>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Premium stainless steel kitchenware. Home of the <span className="text-deep font-semibold">Deep</span> and{" "}
            <span className="text-angel font-semibold">Angel</span> ranges - engineered for durability, designed for
            modern living.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm uppercase tracking-widest mb-4">Navigation</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/categories" className="hover:text-primary transition-colors">Our Products</Link>
            <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm uppercase tracking-widest mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>info@ratandeephouseware.com</p>
            <p>+91 98765 43210</p>
            <p>Mumbai, India</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
        © 2026 Ratandeep Houseware LLP. All rights reserved.
      </div>
    </div>
  </footer>
);
