export function formatDtaDi(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 2) return digits;

  const ano = digits.slice(0, 2);
  const numero = digits.slice(2, 9);
  const digito = digits.slice(9, 10);
  return `${ano}/${numero}${digito ? `-${digito}` : ""}`;
}

export function formatDuimp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 13);
  if (digits.length < 2) return digits;

  const ano = digits.slice(0, 2);
  if (digits.length === 2) return `${ano}BR`;
  const numero = digits.slice(2, 12);
  const digito = digits.slice(12, 13);
  return `${ano}BR${numero}${digito ? `-${digito}` : ""}`;
}

export const DTA_DI_PATTERN = /^\d{2}\/\d{7}-\d$/;
export const DUIMP_PATTERN = /^\d{2}BR\d{10}-\d$/;

export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}
