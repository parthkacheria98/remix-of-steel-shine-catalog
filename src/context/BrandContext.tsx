import { createContext, useContext, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export type BrandSlug = "deep" | "angel";

interface BrandTheme {
  primary: string; // HSL components, e.g. "358 73% 49%"
  accent: string;
  ring: string;
  label: string;
}

const THEMES: Record<BrandSlug, BrandTheme> = {
  deep: {
    primary: "358 73% 49%", // red
    accent: "211 80% 28%", // pantone
    ring: "358 73% 49%",
    label: "DEEP STEEL",
  },
  angel: {
    primary: "211 80% 28%", // pantone
    accent: "358 73% 49%", // red
    ring: "211 80% 28%",
    label: "ANGEL",
  },
};

interface Ctx {
  brand: BrandSlug;
  setBrand: (b: BrandSlug) => void;
  label: string;
}

const BrandContext = createContext<Ctx | null>(null);

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useSearchParams();
  const raw = params.get("brand");
  const brand: BrandSlug = raw === "angel" ? "angel" : "deep";

  useEffect(() => {
    const t = THEMES[brand];
    const root = document.documentElement;
    root.style.setProperty("--primary", t.primary);
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--ring", t.ring);
  }, [brand]);

  const value = useMemo<Ctx>(
    () => ({
      brand,
      label: THEMES[brand].label,
      setBrand: (b) => {
        const next = new URLSearchParams(params);
        next.set("brand", b);
        setParams(next, { replace: false });
      },
    }),
    [brand, params, setParams]
  );

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
};

export const useBrand = () => {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
};
