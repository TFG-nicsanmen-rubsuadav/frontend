import { useState, useEffect } from "react";
import { API_URL } from "../config";
import SectionButton from "../components/SectionButton";

export default function SectionsScroll({ restaurantId }) {
  const [sections, setSections] = useState([]);

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
      </div>
    </div>
  );
}
