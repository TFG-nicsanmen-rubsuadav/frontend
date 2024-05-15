import { useEffect, useState } from "react";

// local imports
import { API_URL } from "../config";

export default function Menu({ restaurantId }) {
  const [fullMenu, setFullMenu] = useState([]);

  async function fetchFullMenu() {
    const response = await fetch(
      `${API_URL}/api/${restaurantId}/zUKq6KT3LRmYAe2yLOCR/fullMenu`
    );
    const data = await response.json();
    setFullMenu(data.sections);
  }

  useEffect(() => {
    fetchFullMenu();
  }, []);

  return (
    <div className="flex flex-col rounded-xl bg-gray-background mx-4 mb-12">
      {fullMenu.map(
        (section) =>
          section.available && (
            <div id={section.name} key={section.id} className="mx-4 mb-2">
              <h2 className="text-xl font-bold mt-5">{section.name}</h2>
              <span className="text-sm font-normal ml-5">
                {section.description}
              </span>
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
                  </div>
                </div>
              ))}
            </div>
          )
      )}
    </div>
  );
}
