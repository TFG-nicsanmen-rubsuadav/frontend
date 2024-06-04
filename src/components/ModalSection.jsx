import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// local imports
import {
  fetchCreateSection,
  fetchSectionById,
  fetchUpdateSection,
} from "../api/endpoints";
import { showErrorAlert, showSuccessAlert } from "../utils/alerts";

export default function ModalSection({ onClose, sectionId, restaurantId }) {
  const [form, setForm] = useState({
    name: "",
    available: true,
    description: "",
  });
  const [errors, setErrors] = useState({});

  const { name, description } = form;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors({});
  }

  async function handleSuccess(message) {
    showSuccessAlert(message).then(() => {
      onClose();
      window.location.reload();
    });
  }

  async function handleError(status) {
    switch (status) {
      case 400:
        setErrors({ name: "El nombre es obligatorio" });
        break;
      case 403:
        localStorage.clear();
        showErrorAlert(
          status === 400 ? "Actualizar sección" : "Crear secciones"
        ).then(() => {
          window.location.href = "/login";
        });
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (sectionId) {
      const { status } = await fetchUpdateSection(
        form,
        restaurantId,
        sectionId
      );
      if (status === 200) {
        handleSuccess("Sección actualizada exitosamente");
      } else {
        handleError(status);
      }
    } else {
      const { status } = await fetchCreateSection(form, restaurantId);
      if (status === 201) {
        handleSuccess("Sesion creada exitosamente");
      } else {
        handleError(status);
      }
    }
  }

  //retrieving the section by id
  async function getSectionById() {
    const { data } = await fetchSectionById(restaurantId, sectionId);
    setForm({
      name: data.name,
      description: data.description,
      available: data.available,
    });
  }

  useEffect(() => {
    if (sectionId) {
      getSectionById();
    }
  }, [sectionId]);

  console.log("form", form)

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="modal-content rounded-md px-4 sm:px-20 py-4 sm:py-16 bg-gray-label w-full sm:w-1/2 h-full sm:h-1/2 max-h-full overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col pb-2 sm:pb-7">
            <label className="mb-0.5 text-md">Nombre:</label>
            <input
              className="flex-grow text-md bg-background-label text-black outline-0"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col pb-2 sm:pb-7">
            <label className="mb-0.5 text-md">Descripción:</label>
            <input
              className="flex-grow text-md bg-background-label text-black outline-0"
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="font-bold py-2 px-4 rounded text-sm text-white bg-red-500 hover:bg-red-400 active:bg-red-300 w-auto"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="font-bold py-2 px-4 rounded text-sm text-white bg-green-button hover:bg-hover-button w-auto"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

ModalSection.propTypes = {
  onClose: PropTypes.func.isRequired,
  sectionId: PropTypes.string,
  menuId: PropTypes.string.isRequired,
  restaurantId: PropTypes.string.isRequired,
};
