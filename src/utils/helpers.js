import { allergensList } from "../utils/constants";

export function formatBirthDate(form) {
  let formToSend = { ...form };

  if (formToSend.birthDate) {
    const date = new Date(formToSend.birthDate);
    formToSend.birthDate = date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  return formToSend;
}

export function getAllergens() {
  return allergensList.map((allergen) => ({
    value: allergen,
    label: allergen,
  }));
}

export function validateDishPrices(priceType, uniquePrice, rationsPrices) {
  if (priceType === "unique") {
    return { rations: { default: uniquePrice }, errors: {} };
  } else if (priceType === "rations") {
    return { rations: rationsPrices, errors: {} };
  } else {
    return { errors: { price: "Selecciona un tipo de precio" } };
  }
}
