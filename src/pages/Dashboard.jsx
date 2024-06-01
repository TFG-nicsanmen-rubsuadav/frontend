import { useEffect, useState } from "react";

// local imports
import SideBar from "../components/SideBar";
import {
  fetchTotalVisits,
  fetchVisitsByDate,
  fetchRestaurantByUserId,
} from "../api/endpoints";
import BarChar from "../components/BarChar";
import LineChar from "../components/LineChar";

export default function Dashboard() {
  const [totalVisits, setTotalVisits] = useState({});
  const [visitsByDate, setVisitsByDate] = useState({});
  const [visitsByRange, setVisitsByRange] = useState({});
  const [restaurantId, setRestaurantId] = useState(null);
  const userId = localStorage.getItem("userId");
  const [range, setRange] = useState(7);

  async function getRestaurantByUserId() {
    const response = await fetchRestaurantByUserId(userId);
    const restaurantId = response[0].id;
    setRestaurantId(restaurantId);
  }

  async function getTotalVisits() {
    const response = await fetchTotalVisits(restaurantId);
    setTotalVisits(response);
  }

  async function getVisitsByDate() {
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear(), 4, 26); // 26 de mayo del año actual
    const visitsByDate = {};

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = date.toLocaleDateString("en-CA");
      const response = await fetchVisitsByDate(restaurantId, dateString);
      visitsByDate[dateString] = response.visits;
    }

    setVisitsByDate(visitsByDate);
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
  }, []);

  useEffect(() => {
    if (restaurantId) {
      getTotalVisits();
      getVisitsByDate();
      getVisitsByRange(range);
    }
  }, [restaurantId, range]);

  const visitsArray = Object.entries(visitsByDate).map(([date, visits]) => ({
    date,
    visits,
  }));

  const rangeArray = Object.entries(visitsByRange).map(([date, visits]) => ({
    date,
    visits,
  }));

  return (
    <div className="flex flex-col md:flex-row">
      <SideBar />
      <div className="mt-5 sm:ml-5 w-full max-w-2xl mx-auto">
        <h1 className="text-black font-bold text-xl mt-5 ml-10 mb-44">
          {totalVisits.totalVisits} visitas totales
        </h1>
        <div className="w-full">
          <BarChar
            arrayData={visitsArray}
            dataXKey="date"
            dataYKey="visits"
            dataYLabel="Visitas"
          />
          <select
            className="ml-8"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option value={7}>7 días</option>
            <option value={15}>15 días</option>
            <option value={30}>30 días</option>
          </select>
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
