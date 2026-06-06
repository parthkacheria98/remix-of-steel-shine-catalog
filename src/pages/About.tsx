import { motion } from "framer-motion";
import { Shield, Factory, Award, Users } from "lucide-react";

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
        <span className="text-primary font-mono text-xs tracking-tighter uppercase">About DEEP STEEL</span>
        <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mt-4 mb-6 leading-[0.95]">
          The Standard of Hygiene.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Since 1984, DEEP STEEL has been at the forefront of stainless steel kitchenware manufacturing.
          We engineer products that meet the rigorous demands of commercial kitchens while maintaining
          the elegance expected in premium households.
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
