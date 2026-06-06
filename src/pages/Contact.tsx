import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <span className="text-primary font-mono text-xs tracking-tighter uppercase">Get in Touch</span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mt-2 mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-lg mb-12">
          For bulk orders, custom specifications, or distribution enquiries, reach out to our team.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          {submitted ? (
            <div className="border border-border p-12 text-center space-y-4">
              <p className="text-2xl font-heading font-bold">Thank you!</p>
              <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { key: "name", label: "Full Name", type: "text" },
                { key: "email", label: "Email Address", type: "email" },
                { key: "subject", label: "Subject", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2 block">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2 block">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-4 font-heading font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors duration-300"
              >
                Send Enquiry
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="space-y-6">
            {[
              { icon: MapPin, label: "Address", value: "Ratandeep Houseware LLP\nPlot 42, Industrial Area Phase II\nMumbai, Maharashtra 400001" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210\n+91 22 2345 6789" },
              { icon: Mail, label: "Email", value: "info@ratandeephouseware.com\nsales@ratandeephouseware.com" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} strokeWidth={1.5} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="aspect-video bg-muted border border-border flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Map Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
