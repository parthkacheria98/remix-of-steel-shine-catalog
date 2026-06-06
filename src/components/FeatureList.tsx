import { Check } from "lucide-react";

interface FeatureListProps {
  features: string[];
}

export const FeatureList = ({ features }: FeatureListProps) => (
  <div className="space-y-3">
    <h3 className="text-sm font-heading font-semibold uppercase tracking-widest text-foreground">
      Features
    </h3>
    <ul className="space-y-2">
      {features.map((f) => (
        <li key={f} className="flex items-center gap-3 text-sm text-foreground">
          <Check size={16} className="text-primary flex-shrink-0" />
          {f}
        </li>
      ))}
    </ul>
  </div>
);
