// Legacy module kept as a thin shim. Ratandeep Houseware unifies both
// Deep and Angel under one brand identity - no runtime brand toggle.
export const COMPANY_LABEL = "RATANDEEP HOUSEWARE";

export const BrandProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const useBrand = () => ({ label: COMPANY_LABEL });
