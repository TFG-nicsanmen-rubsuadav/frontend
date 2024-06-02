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

export function validateDishPrices(
  priceType,
  rations,
  uniquePrice,
  rationsPrices
) {
  if (priceType === "unique") {
    rations = { default: uniquePrice };
    return {};
  } else if (priceType === "rations") {
    rations = rationsPrices;
    return {};
  } else {
    return { price: "Selecciona un tipo de precio" };
  }
}
