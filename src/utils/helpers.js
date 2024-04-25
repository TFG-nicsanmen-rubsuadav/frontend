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
