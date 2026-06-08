import { Variant } from "@/data/api";

interface VariantListProps {
  variants: Variant[];
}

export const VariantList = ({ variants }: VariantListProps) => (
  <div className="space-y-4">
    <h3 className="text-sm font-heading font-semibold uppercase tracking-widest text-foreground">
      Available Variants ({variants.length})
    </h3>
    <div className="border border-border divide-y divide-border">
      <div className="grid grid-cols-4 gap-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted">
        <span>Size</span>
        <span>Design</span>
        <span>Capacity</span>
        <span>SKU</span>
      </div>
      {variants.map((v) => (
        <div key={v.id} className="grid grid-cols-4 gap-4 px-4 py-3 text-sm font-mono">
          <span>{v.size || "-"}</span>
          <span>{v.design || "-"}</span>
          <span>{v.capacity || "-"}</span>
          <span className="text-muted-foreground">{v.sku || "-"}</span>
        </div>
      ))}
    </div>
  </div>
);
