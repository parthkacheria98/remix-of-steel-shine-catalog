import { motion } from "framer-motion";
import { Shield, Factory, Award, Users, Play } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease },
};

const About = () => (
  <div>
    {/* Hero */}
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <motion.div {...fadeIn} className="max-w-2xl">
        <span className="text-primary font-mono text-xs tracking-tighter uppercase">About Ratandeep Houseware</span>
        <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mt-4 mb-6 leading-[0.95]">
          The Standard of Hygiene.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Ratandeep Houseware has been crafting premium stainless steel kitchenware for decades, home to the
          <span className="text-deep font-semibold"> Deep</span> and
          <span className="text-angel font-semibold"> Angel</span> ranges. We engineer products that meet the
          rigorous demands of commercial kitchens while maintaining the elegance expected in premium households.
        </p>
      </motion.div>
    </section>

    {/* Values */}
    <section className="bg-muted/50 border-y border-border">
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: Factory, title: "Manufacturing", desc: "State-of-the-art facility with automated precision tooling. Every product passes through 12 quality checkpoints." },
            { icon: Shield, title: "Quality", desc: "Only 304 food-grade stainless steel. 0.8mm wall thickness as standard. ISO 9001:2015 certified." },
            { icon: Award, title: "Heritage", desc: "Four decades of expertise in steel craftsmanship. Trusted by over 500 hospitality brands across India." },
            { icon: Users, title: "Team", desc: "200+ skilled craftspeople dedicated to precision engineering and quality assurance." },
          ].map((item) => (
            <div key={item.title} className="space-y-4">
              <div className="w-12 h-12 border border-border flex items-center justify-center">
                <item.icon size={22} strokeWidth={1.5} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg tracking-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Video */}
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="mb-10 max-w-2xl">
        <span className="text-primary font-mono text-xs tracking-tighter uppercase">Inside the Factory</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter mt-2">See How We Build</h2>
        <p className="text-muted-foreground mt-3">
          A look at our manufacturing floor, craftsmanship, and quality process.
        </p>
      </div>
      <div className="relative aspect-video bg-foreground border border-border overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-hover group-hover:scale-110 transition-transform">
            <Play size={28} strokeWidth={2} className="text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-6 left-6 text-background/80">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Coming Soon</p>
          <p className="text-sm font-heading mt-1">Factory tour video</p>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { value: "40+", label: "Years of Excellence" },
          { value: "500+", label: "B2B Partners" },
          { value: "1M+", label: "Products Delivered" },
          { value: "12", label: "Quality Checkpoints" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-4xl md:text-5xl font-heading font-bold tracking-tighter text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default About;
