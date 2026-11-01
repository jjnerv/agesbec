import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { buscarAverbacoesPorModal } from "../api/averbacao.api";

export function useAverbacoesPorModal(modalId: string, page: number) {
  return useQuery({
    queryKey: ["averbacoes", modalId, page],
    queryFn: ({ signal }) =>
      buscarAverbacoesPorModal(modalId, page, signal),
    placeholderData: keepPreviousData,
  });
}