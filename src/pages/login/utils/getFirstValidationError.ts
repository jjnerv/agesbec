import type { FieldErrors } from "react-hook-form";
import type { LoginFormData } from "../schemas/login.schema";

const fallbackMessage = "Confira os dados informados.";

export function getFirstValidationError(
  errors: FieldErrors<LoginFormData>,
): string {
  const firstError = Object.values(errors)
    .map((error) => error?.message)
    .find((message): message is string => typeof message === "string");

  return firstError ?? fallbackMessage;
}