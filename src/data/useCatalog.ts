import { useQuery } from "@tanstack/react-query";
import { fetchCatalog, Catalog } from "./api";

export function useCatalog() {
  return useQuery<Catalog>({
    queryKey: ["catalog"],
    queryFn: fetchCatalog,
    staleTime: 60_000,
  });
}
