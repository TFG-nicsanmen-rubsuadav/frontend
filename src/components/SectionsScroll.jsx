import { useState, useEffect } from "react";
import { API_URL } from "../config";
import SectionButton from "../components/SectionButton";

export default function SectionsScroll() {
  const [sections, setSections] = useState([]);

  async function getSections() {
    const response = await fetch(
      `${API_URL}/api/3bdGxrc3e1yFzHcVGw5Y/zUKq6KT3LRmYAe2yLOCR/showSections`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token"),
        },
      }
    );
    const data = await response.json();
    setSections(data);
  }

  useEffect(() => {
    getSections();
  }, []);

  return (
    <div className="overflow-x-auto whitespace-nowrap">
      <div className="flex">
        {sections.map((section) => (
          <div key={section.id}>
            <SectionButton type="button" text={section.name}></SectionButton>
          </div>
        ))}
      </div>
    </div>
  );
}
