const allowedDomains = ["gmail.com", "hotmail.com", "yahoo.es"];

/**
 * Algoritmo de Luhn
 */
const isValidLuhn = (cardNumber: string): boolean => {
  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

export const validateCreateTokenBody = (body: any) => {
  if (!body) throw new Error("Body is required");

  const {
    card_number,
    cvv,
    expiration_month,
    expiration_year,
    email,
  } = body;

  // -------------------------
  // card_number
  // -------------------------
  if (!card_number || typeof card_number !== "number") {
    throw new Error("card_number debe ser un número");
  }

  const cardStr = card_number.toString();

  if (cardStr.length < 13 || cardStr.length > 16) {
    throw new Error("longitud de card_number debe ser entre 13 y 16 dígitos");
  }

  if (!isValidLuhn(cardStr)) {
    throw new Error("card_number no es válido (Luhn falló)");
  }

  // -------------------------
  // cvv
  // -------------------------
  if (!cvv || typeof cvv !== "number") {
    throw new Error("cvv debe ser un número");
  }

  const cvvStr = cvv.toString();
  if (cvvStr.length < 3 || cvvStr.length > 4) {
    throw new Error("longitud de cvv debe ser 3 o 4 dígitos");
  }

  // -------------------------
  // expiration_month
  // -------------------------
  if (!expiration_month || typeof expiration_month !== "string") {
    throw new Error("expiration_month debe ser una cadena de texto");
  }

  const month = parseInt(expiration_month, 10);

  if (expiration_month.length < 1 || expiration_month.length > 2) {
    throw new Error("longitud de expiration_month debe ser 1 o 2 dígitos");
  }

  if (month < 1 || month > 12) {
    throw new Error("expiration_month debe estar entre 1 y 12");
  }

  // -------------------------
  // expiration_year
  // -------------------------
  if (!expiration_year || typeof expiration_year !== "string") {
    throw new Error("expiration_year debe ser una cadena de texto");
  }

  if (expiration_year.length !== 4) {
    throw new Error("año de expiración debe tener 4 dígitos");
  }

  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 5;
  const year = parseInt(expiration_year, 10);

  if (year < currentYear || year > maxYear) {
    throw new Error(
      `año de expiración debe estar entre ${currentYear} y ${maxYear}`
    );
  }

  // -------------------------
  // email
  // -------------------------
  if (!email || typeof email !== "string") {
    throw new Error("email de ser una cadena de texto");
  }

  if (email.length < 5 || email.length > 100) {
    throw new Error("longitud de email debe ser entre 5 y 100 caracteres");
  }

  const emailRegex = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;
  const match = email.match(emailRegex);

  if (!match) {
    throw new Error("formato de email no válido");
  }

  const domain = email.split("@")[1];

  if (!allowedDomains.includes(domain)) {
    throw new Error("dominio de email no permitido");
  }
};