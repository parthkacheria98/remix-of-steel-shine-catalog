import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { useCatalog } from "@/data/useCatalog";
import { useBrand } from "@/context/BrandContext";
import { Shield, Droplets, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease },
};

const Index = () => {
  const { data, isLoading, error } = useCatalog();
  const { brand, label } = useBrand();

  const categories = (data?.categories ?? []).filter((c) => c.brandSlug === brand);
  const products = (data?.products ?? []).filter((p) => p.brandSlug === brand);
  const featured = products.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <motion.span {...fadeIn} className="text-primary font-mono text-xs tracking-tighter uppercase">
                {label} — Industrial Excellence
              </motion.span>
              <motion.h1
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: 0.1 }}
                className="text-5xl md:text-7xl font-heading font-bold tracking-tighter mt-4 mb-6 leading-[0.95]"
              >
                Premium Stainless Steel Kitchenware.
              </motion.h1>
              <motion.p
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md"
              >
                Durable • Hygienic • Long Lasting. Engineered for high-performance environments and professional kitchens.
              </motion.p>
              <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.3 }}>
                <Link
                  to={`/categories?brand=${brand}`}
                  className="inline-block bg-primary text-primary-foreground px-8 py-4 font-heading font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors duration-300"
                >
                  Browse {label}
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
            >
              <div className="aspect-[4/3] bg-muted overflow-hidden border border-border shadow-medium">
                <img src={heroImage} alt="Premium stainless steel kitchenware collection" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-primary font-mono text-xs tracking-tighter uppercase">Product Range</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter mt-2">Categories</h2>
          </div>
          <Link to={`/categories?brand=${brand}`} className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-2">
            View All <span>→</span>
          </Link>
        </div>
        {isLoading && <p className="text-muted-foreground">Loading catalogue…</p>}
        {error && <p className="text-destructive">Failed to load catalogue.</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="bg-muted/50 border-y border-border">
          <div className="max-w-[1200px] mx-auto px-6 py-20">
            <div className="mb-12">
              <span className="text-primary font-mono text-xs tracking-tighter uppercase">Selected Works</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter mt-2">Featured Products</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-xs tracking-tighter uppercase">The Standard</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter mt-2">Why Choose {label}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: "304 Grade Steel", desc: "Food-grade stainless steel with 18/8 chromium-nickel composition." },
            { icon: Droplets, title: "Hygienic", desc: "Non-porous surface prevents bacterial growth. Easy to clean and maintain." },
            { icon: Clock, title: "Built to Last", desc: "0.8mm wall thickness as standard. Engineered for 24/7 commercial use." },
            { icon: Award, title: "Certified Quality", desc: "ISO 9001 certified manufacturing with rigorous quality control." },
          ].map((item) => (
            <div key={item.title} className="text-center space-y-4">
              <div className="w-14 h-14 mx-auto border border-border flex items-center justify-center">
                <item.icon size={24} strokeWidth={1.5} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold tracking-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-foreground">
        <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter text-background mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-background/60 max-w-md mx-auto mb-8">
            Reach out for bulk orders, custom specifications, or distribution enquiries.
          </p>
          <Link
            to={`/contact?brand=${brand}`}
            className="inline-block bg-primary text-primary-foreground px-8 py-4 font-heading font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
