import Swal from "sweetalert2";

export async function showErrorAlert(text) {
  Swal.fire({
    icon: "error",
    title: "Session expirada!",
    text: `Si quieres volver a ${text}, debes iniciar sesión nuevamente.`,
    confirmButtonColor: "#034E41",
    timer: 3000,
  });
}

export async function showSuccessAlert(text) {
  Swal.fire({
    icon: "success",
    title: "Éxito!",
    text: `${text}`,
    timer: 3000,
    confirmButtonColor: "#034E41"
  });
}

export async function showAskAlert(text) {
  return Swal.fire({
    icon: "question",
    title: "¿Estás seguro?",
    text: `${text}`,
    showCancelButton: true,
    confirmButtonText: "Sí",
    confirmButtonColor: "#034E41",
    cancelButtonText: "No",
    cancelButtonColor: "#EC5353",
  });
}
