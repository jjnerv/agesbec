
import { API_URLS } from "../../../shared/constants/api.constants";
import { averbacoesSchema } from "../schemas/averbacao.schema";
import { AVERBACAO_PAGE_SIZE as PAGE_SIZE} from "../constants/averbacao.constants";
 
export async function buscarAverbacoesPorModal(
  modalId: string,
  page: number,
  signal?: AbortSignal, 
) {
  const url = new URL(API_URLS.AVERBACOES);
  url.searchParams.set("modalId", modalId);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(PAGE_SIZE));

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Não foi possível carregar as averbações.");
  }

  return averbacoesSchema.parse(await response.json());
}