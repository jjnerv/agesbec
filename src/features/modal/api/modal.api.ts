import { API_URLS } from "../../../shared/constants/api.constants";
import { modaisSchema } from "../schemas/modal.schema";

export async function buscarModais() {
  const response = await fetch(API_URLS.MODAIS);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os modais.");
  }

  return modaisSchema.parse(await response.json());
}