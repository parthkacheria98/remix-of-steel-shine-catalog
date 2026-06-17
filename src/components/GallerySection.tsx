import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Image as ImageIcon } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const previewItems = [
  { title: "IHGF Delhi Fair", category: "Trade Show", icon: ImageIcon },
  { title: "Excellence Award", category: "Award", icon: Award },
  { title: "Ambiente Frankfurt", category: "Trade Show", icon: ImageIcon },
  { title: "Best Manufacturer", category: "Award", icon: Award },
];

export const GallerySection = () => (
  <section className="max-w-[1200px] mx-auto px-6 py-20">
    <div className="flex items-end justify-between mb-12">
      <div>
        <span className="text-primary font-mono text-xs tracking-tighter uppercase">Recognition</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter mt-2">Shows & Awards</h2>
      </div>
      <Link to="/gallery" className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-2">
        View Gallery <span>→</span>
      </Link>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {previewItems.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05, ease }}
        >
          <div className="aspect-[4/5] bg-muted border border-border flex items-center justify-center">
            <item.icon size={36} strokeWidth={1} className="text-muted-foreground/40" />
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">{item.category}</p>
            <h3 className="text-sm font-heading font-semibold tracking-tight">{item.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);
