export function isValidCPF(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  // Com isso, só é permitido o CPF no formato EXATO de pontuação ou um
  // CPF válido sem nenhuma pontuação
  if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/.test(value)) {
    return false;
  }

  return true;
}
