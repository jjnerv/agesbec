import { useQuery } from "@tanstack/react-query";
import { buscarModais } from "../api/modal.api";

export function useModais() {
  return useQuery({
    queryKey: ["modais"],
    queryFn: buscarModais,
    staleTime: 5 * 60 * 1000,
  });
}