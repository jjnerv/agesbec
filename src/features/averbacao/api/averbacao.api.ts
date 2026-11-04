
import { API_URLS } from "../../../shared/constants/api.constants";
import { averbacaoSchema, averbacoesSchema } from "../schemas/averbacao.schema";
import type { Averbacao } from "../schemas/averbacao.schema";
import { AVERBACAO_PAGE_SIZE as PAGE_SIZE} from "../constants/averbacao.constants";

export async function buscarAverbacaoPorDta(dta: string, signal?: AbortSignal) {
  const url = new URL(API_URLS.AVERBACOES);
  url.searchParams.set("dta", dta);
  url.searchParams.set("page", "1");
  url.searchParams.set("limit", "100");

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Não foi possível consultar a DTA.");
  }

  const resultados = averbacoesSchema.parse(await response.json());
  const averbacao = resultados.find((item) => String(item.dta) === dta);
  if (!averbacao) {
    throw new Error("Nenhuma DTA foi encontrada com esse número.");
  }
  return averbacao;
}

export async function enviarAverbacao(payload: Omit<Averbacao, "id">) {
  const response = await fetch(API_URLS.AVERBACOES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("O envio não foi concluído. Tente novamente.");
  }
  return averbacaoSchema.parse(await response.json());
}
 
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
