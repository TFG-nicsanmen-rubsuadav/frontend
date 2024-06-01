import Swal from "sweetalert2";

export async function showErrorAlert() {
  Swal.fire({
    icon: "error",
    title: "Session expirada!",
    text: "Si quieres volver a usar el SR, debes iniciar sesión nuevamente.",
    timer: 3000,
  });
}
