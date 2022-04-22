function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const clearValue = clearNumber(value);

  return `${clearValue.slice(0, 4)}${clearValue.length > 4 ? '-' : ''}${clearValue.slice(
    4,
    8
  )}${clearValue.length > 8 ? '-' : ''}${clearValue.slice(8, 12)}${clearValue.length > 12 ? '-' : ''}${clearValue.slice(12, 16)}`.trim();
}

export function formatCVV(value) {
  const clearValue = clearNumber(value);
  let maxLength = 3;

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 6)}`;
  }

  return clearValue;
}
