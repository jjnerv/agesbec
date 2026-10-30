// src/pages/login/tests/getFirstValidationError.test.ts
import { describe, expect, it } from "vitest";
import type { FieldErrors } from "react-hook-form";
import type { LoginFormData } from "../schemas/login.schema";
import { getFirstValidationError } from "../utils/getFirstValidationError";

describe("getFirstValidationError", () => {
  it("retorna a mensagem padrão quando não há erros com mensagem", () => {
    const errors: FieldErrors<LoginFormData> = {};

    expect(getFirstValidationError(errors)).toBe(
      "Confira os dados informados.",
    );
  });
});