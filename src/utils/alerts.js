import Swal from "sweetalert2";

export async function showErrorAlert({ text }) {
  Swal.fire({
    icon: "error",
    title: "Session expirada!",
    text: `Si quieres volver a ${text}, debes iniciar sesión nuevamente.`,
    timer: 3000,
  });
}

export async function showSuccessAlert({ text }) {
  Swal.fire({
    icon: "success",
    title: "Éxito!",
    text: `${text} creado con éxito.`,
    timer: 3000,
  });
}
