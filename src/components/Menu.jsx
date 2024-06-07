import { useEffect, useState } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

// local imports
import { API_URL } from "../config";
import { useAuthContext } from "../context/useAuthContext";
import Modal from "./Modal";
import { fetchDeleteDish, fetchDeleteSection } from "../api/endpoints";
import {
  showAskAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../utils/alerts";
import ModalSection from "./ModalSection";

export default function Menu({ restaurantId }) {
  const [fullMenu, setFullMenu] = useState([]);
  const [update, setUpdate] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [currentDishId, setCurrentDishId] = useState(null);

  // MODAL FUNCTIONS
  function openModal(sectionId, dishId) {
    setCurrentSectionId(sectionId);
    setCurrentDishId(dishId);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openSectionModal(sectionId) {
    setIsSectionModalOpen(true);
    setCurrentSectionId(sectionId);
  }

  function closeSectionModal() {
    setIsSectionModalOpen(false);
  }

  async function fetchFullMenu() {
    const response = await fetch(
      `${API_URL}/api/${restaurantId}/zUKq6KT3LRmYAe2yLOCR/fullMenu`
    );
    const data = await response.json();
    setFullMenu(data.sections);
  }

  async function handleDeleteSection(sectionId) {
    const result = await showAskAlert(
      "¿Estás seguro de que quieres eliminar esta sección?"
    );
    if (result.isConfirmed) {
      const { status } = await fetchDeleteSection(
        restaurantId,
        "zUKq6KT3LRmYAe2yLOCR",
        sectionId
      );
      switch (status) {
        case 204:
          showSuccessAlert("Sección eliminada correctamente");
          window.location.reload();
          break;
        case 403:
          localStorage.clear();
          showErrorAlert("eliminar la sección").then(() => {
            window.location.href = "/login";
          });
          break;
      }
    }
  }

  async function handleDeleteDish(sectionId, dishId) {
    const result = await showAskAlert(
      "¿Estás seguro de que quieres eliminar este plato?"
    );
    if (result.isConfirmed) {
      const { status } = await fetchDeleteDish(
        restaurantId,
        "zUKq6KT3LRmYAe2yLOCR",
        sectionId,
        dishId
      );
      switch (status) {
        case 204:
          showSuccessAlert("Plato eliminado correctamente");
          setUpdate((prev) => !prev);
          break;
        case 403:
          localStorage.clear();
          showErrorAlert("eliminar el plato").then(() => {
            window.location.href = "/login";
          });
          break;
      }
    }
  }

  useEffect(() => {
    fetchFullMenu();
  }, [update]);

  return (
    <div className="flex flex-col rounded-xl bg-gray-background mx-4 mb-12">
      {fullMenu.map(
        (section) =>
          section.available && (
            <div id={section.name} key={section.id} className="mx-4 mb-2">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold mt-5">{section.name}</h2>
                  <span className="text-sm font-normal ml-5">
                    {section.description}
                  </span>
                </div>
                {isAuthenticated && (
                  <div className="flex flex-row space-x-5 mr-4 ml-3">
                    <button
                      onClick={() => openSectionModal(section.id)}
                      className="hover:fill-primary-green p-1 rounded"
                    >
                      <PencilSquareIcon className="h-6 w-6 text-black hover:text-black hover:fill-active-button" />
                    </button>
                    {isSectionModalOpen && (
                      <ModalSection
                        onClose={closeSectionModal}
                        sectionId={currentSectionId}
                        restaurantId={restaurantId}
                        setUpdate={setUpdate}
                      />
                    )}
                    <button
                      onClick={() => handleDeleteSection(section.id)}
                      className="hover: rounded"
                    >
                      <TrashIcon className="h-6 w-6 text-black hover:text-black hover:fill-red-500" />
                    </button>
                  </div>
                )}
              </div>
              {section.dishes.map((dish) => (
                <div key={dish.id} className="flex justify-between p-2">
                  <div>
                    <h3 className="text-lg font-semibold">{dish.name}</h3>
                    <span className="text-sm font-normal ml-5">
                      {dish.description}
                    </span>
                  </div>
                  <div className="flex flex-row space-x-5 mr-4 ml-3">
                    {dish.rations.tapa && (
                      <div>
                        <p>Tapa</p>
                        <p className="font-extrabold">{dish.rations.tapa} €</p>
                      </div>
                    )}
                    {dish.rations.media && (
                      <div>
                        <p>Media</p>
                        <p className="ml-2 font-extrabold">
                          {dish.rations.media} €
                        </p>
                      </div>
                    )}
                    {dish.rations.entera && (
                      <div>
                        <p>Entera</p>
                        <p className="ml-3 font-extrabold">
                          {dish.rations.entera} €
                        </p>
                      </div>
                    )}
                    {dish.rations.default && (
                      <div>
                        <p className="font-extrabold">
                          {dish.rations.default} €
                        </p>
                      </div>
                    )}
                    {isAuthenticated && (
                      <>
                        <button
                          id="editDishButton"
                          onClick={() => openModal(section.id, dish.id)}
                          className="p-1 rounded"
                        >
                          <PencilSquareIcon className="h-6 w-6 text-black hover:text-black hover:fill-active-button" />
                        </button>
                        <button
                          id="deleteDishButton"
                          onClick={() => handleDeleteDish(section.id, dish.id)}
                          className="p-1rounded"
                        >
                          <TrashIcon className="h-6 w-6 text-black hover:text-black hover:fill-red-500" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {isAuthenticated && (
                <div className="flex items-center" id="addDishButton">
                  <button
                    className="focus:outline-none"
                    onClick={() => openModal(section.id)}
                  >
                    <PlusCircleIcon className="h-6 w-6 text-black hover:text-black hover:fill-active-button" />
                  </button>
                  <span className="ml-1">Añadir nuevo plato a la sección</span>
                  {isModalOpen && (
                    <Modal
                      onClose={closeModal}
                      sectionId={currentSectionId}
                      menuId="zUKq6KT3LRmYAe2yLOCR"
                      restaurantId={restaurantId}
                      dishId={currentDishId}
                      setUpdate={setUpdate}
                    />
                  )}
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
}
