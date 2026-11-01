export const AVERBACAO_PAGE_SIZE = 5;

export const averbacaoQueryKeys = {
  all: ["averbacoes"] as const,
  list: (modal: string, page: number) =>
    [...averbacaoQueryKeys.all, { modal, page }] as const,
};