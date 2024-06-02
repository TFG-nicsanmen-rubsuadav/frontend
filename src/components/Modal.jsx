import PropTypes from "prop-types";
import Input from "../components/Input";
import { allergensList } from "../utils/constants";
import Select from "react-select";
import { useState } from "react";

export default function Modal({ isOpen, onClose, sectionId }) {
  if (!isOpen) {
    return null;
  }

  const [priceType, setPriceType] = useState(null);
  const [portionType, setPortionType] = useState([]);

  const portionOptions = ["tapa", "media", "entera"];

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="modal-content rounded-md px-20 py-16 bg-gray-label w-1/2 h-1/2 max-h-full overflow-y-auto">
        <form>
          <div className="flex flex-col pb-7">
            <label className="mb-0.5 text-md">Nombre:</label>
            <input
              className="flex-grow text-md bg-background-label text-black outline-0"
              type="text"
            />
          </div>
          <div className="flex flex-col pb-7">
            <label className="mb-0.5 text-md">Descripción:</label>
            <input
              className="flex-grow text-md bg-background-label text-black outline-0"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-0.5 text-md">Alérgenos:</label>
            <Select
              isMulti
              options={allergensList.map((allergen) => ({
                label: allergen,
                value: allergen,
              }))}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#d7d7d7",
                }),
              }}
              className="w-full outline-0 text-black"
              placeholder={`${allergensList.length} items selected`}
              noOptionsMessage={() => "–"}
            />
            <div className="flex space-x-4 pb-7 justify-center m-8">
              <button
                className={`font-bold py-2 px-4 rounded text-sm sm:text-base md:text-base text-white w-auto ${
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
                className={`font-bold py-2 px-4 rounded text-sm sm:text-base md:text-base text-white w-auto ${
                  priceType === "portion"
                    ? "bg-active-button"
                    : "bg-green-button hover:bg-hover-button"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setPriceType("portion");
                }}
              >
                Precio por Ración
              </button>
            </div>

            {priceType === "unique" && (
              <div className="flex flex-col pb-7">
                <label className="mb-0.5 text-md">Precio:</label>
                <input
                  className="flex-grow text-md bg-background-label text-black outline-0"
                  type="text"
                />
              </div>
            )}

            {priceType === "portion" && (
              <div className="flex flex-col pb-7">
                <div className="flex flex-wrap justify-center space-x-4 pb-7">
                  {portionOptions.map((option) => (
                    <button
                      className={`py-2 px-4 rounded text-sm sm:text-base md:text-base text-black w-auto ${
                        portionType.includes(option)
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
                {portionType.map((type) => (
                  <div key={type} className="flex flex-col pb-7">
                    <label className="mb-0.5 text-md">Precio ({type}):</label>
                    <input
                      className="flex-grow text-md bg-background-label text-black outline-0"
                      type="text"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="font-bold py-2 px-4 rounded text-sm sm:text-base md:text-base text-white bg-green-button hover:bg-hover-button w-auto"
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
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
