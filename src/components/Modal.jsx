import PropTypes from "prop-types";
import Select from "react-select";
import { useEffect, useState } from "react";

// local imports
import { allergensList } from "../utils/constants";
import {
  fetchCreateDish,
  fetchDishById,
  fetchUpdateDish,
} from "../api/endpoints";
import { showErrorAlert, showSuccessAlert } from "../utils/alerts";
import { getAllergens, validateDishPrices } from "../utils/helpers";

export default function Modal({
  onClose,
  sectionId,
  menuId,
  restaurantId,
  dishId,
  setUpdate,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    available: true,
    allergens: [],
  });
  const [errors, setErrors] = useState({});
  const [uniquePrice, setUniquePrice] = useState(0);
  const [rationsPrices, setRationsPrices] = useState({
    tapa: 0,
    media: 0,
    entera: 0,
  });
  const { name, description } = form;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors({});
  }

  function onChangeAllergens(selected) {
    setForm((prev) => ({ ...prev, allergens: selected.map((s) => s.value) }));
  }

  async function handleSuccess(message) {
    showSuccessAlert(message).then(() => {
      onClose();
      setUpdate((prev) => !prev);
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
          status === 400 ? "Actualizar platos" : "Crear platos"
        ).then(() => {
          window.location.href = "/login";
        });
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let rations = {};
    const { rations: validatedRations, errors } = validateDishPrices(
      priceType,
      uniquePrice,
      rationsPrices
    );
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    rations = validatedRations;
    if (dishId) {
      const { status } = await fetchUpdateDish(
        { ...form, rations },
        restaurantId,
        sectionId,
        dishId
      );
      if (status === 200) {
        handleSuccess("Plato actualizado exitosamente");
      } else {
        handleError(status);
      }
    } else {
      const { status } = await fetchCreateDish(
        { ...form, rations },
        restaurantId,
        menuId,
        sectionId
      );
      if (status === 201) {
        handleSuccess("Plato creado exitosamente");
      } else {
        handleError(status);
      }
    }
  }

  //retrieving the dish by id
  async function getDishyById() {
    const { data } = await fetchDishById(restaurantId, sectionId, dishId);
    setForm({
      name: data.name,
      description: data.description,
      available: data.available,
      allergens: data.allergens,
    });
    setUniquePrice(data.rations.default);
    setRationsPrices({
      tapa: data.rations.tapa,
      media: data.rations.media,
      entera: data.rations.entera,
    });
  }

  useEffect(() => {
    if (dishId) {
      getDishyById();
    }
  }, [dishId, setUpdate]);

  const [priceType, setPriceType] = useState(null);
  const [rationsType, setPortionType] = useState([]);
  const rationsOptions = ["tapa", "media", "entera"];

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="modal-content rounded-md px-4 sm:px-20 py-4 sm:py-16 bg-gray-label w-full sm:w-1/2 h-full sm:h-1/2 max-h-full overflow-y-auto">
        <form onSubmit={handleSubmit} id="modal">
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
          <div className="flex flex-col">
            <label className="mb-0.5 text-md">Alérgenos:</label>
            <Select
              isMulti
              options={getAllergens()}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#d7d7d7",
                }),
              }}
              className="w-full outline-0 text-black"
              placeholder={`Hay ${allergensList.length}, puedes seleccionar todos los que apliquen o ninguno si no aplica`}
              noOptionsMessage={() => "–"}
              onChange={onChangeAllergens}
              id="allergens"
              name="allergens"
              value={form.allergens.map((a) => ({ value: a, label: a }))}
            />
            <div className="flex space-x-2 sm:space-x-4 pb-4 sm:pb-7 m-2 sm:m-8 flex-col">
              <div className="flex space-x-2 sm:space-x-4 justify-center">
                <button
                  id="unique"
                  className={`font-bold py-2 px-2 sm:px-4 rounded text-sm sm:text-base md:text-base text-white w-auto ${
                    priceType === "unique"
                      ? "bg-active-button"
                      : "bg-green-button hover:bg-hover-button"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setPriceType("unique");
                  }}
                >
                  Precio Único
                </button>
                <button
                  id="rations"
                  className={`font-bold py-2 px-2 sm:px-4 rounded text-sm sm:text-base md:text-base text-white w-auto ${
                    priceType === "rations"
                      ? "bg-active-button"
                      : "bg-green-button hover:bg-hover-button"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setPriceType("rations");
                  }}
                >
                  Precio por Ración
                </button>
              </div>
              {errors.price && (
                <span className="text-red-500 text-sm text-center mt-2">
                  {errors.price}
                </span>
              )}
            </div>
            {priceType === "unique" && (
              <div className="flex flex-col pb-2 sm:pb-7">
                <label className="mb-0.5 text-md">Precio:</label>
                <input
                  className="flex-grow text-md bg-background-label text-black outline-0"
                  type="number"
                  required
                  step={0.01}
                  min={0}
                  value={uniquePrice}
                  onChange={(e) => setUniquePrice(e.target.value)}
                />
              </div>
            )}

            {priceType === "rations" && (
              <div className="flex flex-col pb-2 sm:pb-7">
                <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 pb-4 sm:pb-7">
                  {rationsOptions.map((option) => (
                    <button
                      id="rationsButtons"
                      className={`py-2 px-2 sm:px-4 rounded text-sm sm:text-base md:text-base text-black w-auto ${
                        rationsType.includes(option)
                          ? "bg-gray-400 font-semibold hover:bg-gray-300"
                          : "bg-gray-background hover:bg-gray-300"
                      }`}
                      key={option}
                      onClick={(e) => {
                        e.preventDefault();
                        setPortionType((prev) =>
                          prev.includes(option)
                            ? prev.filter((o) => o !== option)
                            : [...prev, option]
                        );
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {rationsType.map((type) => (
                  <div key={type} className="flex flex-col pb-2 sm:pb-7">
                    <label className="mb-0.5 text-md">Precio ({type}):</label>
                    <input
                      step={0.01}
                      className="flex-grow text-md bg-background-label text-black outline-0"
                      type="number"
                      min={0}
                      required
                      value={rationsPrices[type]}
                      onChange={(e) =>
                        setRationsPrices((prev) => ({
                          ...prev,
                          [type]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            )}
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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  sectionId: PropTypes.string,
  menuId: PropTypes.string.isRequired,
  restaurantId: PropTypes.string.isRequired,
  dishId: PropTypes.string,
  setUpdate: PropTypes.func.isRequired,
};
