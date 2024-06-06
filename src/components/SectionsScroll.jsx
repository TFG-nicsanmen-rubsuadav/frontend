import { useState, useEffect } from "react";
import { API_URL } from "../config";
import SectionButton from "../components/SectionButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../context/useAuthContext";
import ModalSection from "./ModalSection";

export default function SectionsScroll({ restaurantId }) {
  const [sections, setSections] = useState([]);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const { isAuthenticated } = useAuthContext();

  function openSectionModal() {
    setIsSectionModalOpen(true);
  }

  function closeSectionModal() {
    setIsSectionModalOpen(false);
  }

  async function getSections() {
    const response = await fetch(
      `${API_URL}/api/${restaurantId}/zUKq6KT3LRmYAe2yLOCR/showSections`
    );
    const data = await response.json();
    setSections(data);
  }

  useEffect(() => {
    getSections();
  }, []);

  return (
    <div className="flex flex-nowrap w-full overflow-x-auto whitespace-nowrap">
      <div className="flex">
        {sections.map(
          (section) =>
            section.available && (
              <div key={section.id}>
                <SectionButton
                  type="button"
                  text={section.name}
                ></SectionButton>
              </div>
            )
        )}
        {isAuthenticated && (
          <div className="flex items-center">
            <button
              id="addSectionButton"
              className="focus:outline-none"
              onClick={() => openSectionModal()}
            >
              <PlusCircleIcon className="h-8 w-8 ml-6 fill-primary-green text-white hover:text-primary-green hover:fill-white" />
            </button>
            <span className="ml-1">Añadir nueva sección</span>
          </div>
        )}
        {isSectionModalOpen && (
          <ModalSection
            onClose={closeSectionModal}
            menuId="zUKq6KT3LRmYAe2yLOCR"
            restaurantId={restaurantId}
          />
        )}
      </div>
    </div>
  );
}
