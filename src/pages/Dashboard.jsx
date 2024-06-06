import { useEffect, useState } from "react";

// local imports
import SideBar from "../components/SideBar";
import ConfigurationModal from "../components/ConfigurationModal";
import {
  fetchTotalVisits,
  fetchVisitsByDate,
  fetchRestaurantByUserId,
  fetchRestaurantById,
} from "../api/endpoints";
import LineChar from "../components/LineChar";

export default function Dashboard() {
  const [totalVisits, setTotalVisits] = useState({});
  const [visitsByRange, setVisitsByRange] = useState({});
  const [restaurantId, setRestaurantId] = useState(null);
  const userId = localStorage.getItem("userId");
  const [range, setRange] = useState(7);
  const [restaurant, setRestaurant] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  async function getRestaurantByUserId() {
    const response = await fetchRestaurantByUserId(userId);
    const restaurantId = response[0].id;
    setRestaurantId(restaurantId);
  }

  async function getRestaurantById() {
    const response = await fetchRestaurantById(restaurantId);
    setRestaurant(response);
  }

  async function getTotalVisits() {
    const response = await fetchTotalVisits(restaurantId);
    setTotalVisits(response);
  }

  async function getVisitsByRange(range) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - range);
    const visitsByRange = {};

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const requestDateString = date.toLocaleDateString("en-CA"); // para la solicitud al backend
      const displayDateString = date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
      }); // para el gráfico
      const response = await fetchVisitsByDate(restaurantId, requestDateString);
      visitsByRange[displayDateString] = response.visits;
    }

    setVisitsByRange(visitsByRange);
  }

  useEffect(() => {
    getRestaurantByUserId();
    getRestaurantById();
  }, [restaurantId, userId]);

  useEffect(() => {
    if (restaurantId) {
      getTotalVisits();
      getVisitsByRange(range);
    }
  }, [restaurantId, range]);

  const rangeArray = Object.entries(visitsByRange).map(([date, visits]) => ({
    date,
    visits,
  }));

  return (
    <div className="flex flex-col md:flex-row">
      <SideBar restaurantId={restaurantId} openModal={openModal} />
      <div className="mt-5 sm:ml-5 w-full max-w-2xl mx-auto ">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold ml-2 text-2xl">
            Panel de control - {restaurant.restaurantName}
          </h1>
        </div>
        <div className="flex items-center mb-10">
          <select
            className="font-bold py-2 px-4 my-5 ml-5 rounded text-sm sm:text-base md:text-base bg-green-button hover:bg-hover-button text-white"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option className="bg-green-button" value={7}>
              7 días
            </option>
            <option className="bg-green-button" value={14}>
              14 días
            </option>
            <option className="bg-green-button" value={30}>
              30 días
            </option>
          </select>
          <h1 className="text-black text-lg mt- ml-10 mr-5">
            Número de visitas totales: {totalVisits.totalVisits}
          </h1>
        </div>
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-10"
            onClick={closeModal}
          >
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
              <ConfigurationModal
                closeModal={closeModal}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
        <div className="w-full">
          <LineChar
            arrayData={rangeArray}
            dataXKey="date"
            dataYKey="visits"
            dataYLabel="Visitas"
          />
        </div>
      </div>
    </div>
  );
}
