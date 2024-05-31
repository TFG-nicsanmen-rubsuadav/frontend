import { useEffect, useState } from "react";

// local imports
import SideBar from "../components/SideBar";
import {
  fetchTotalVisits,
  fetchVisitsByDate,
  fetchRestaurantByUserId,
  fetchVisitsByRange,
} from "../api/endpoints";
import BarChar from "../components/BarChar";

export default function Dashboard() {
  const [totalVisits, setTotalVisits] = useState({});
  const [visitsByDate, setVisitsByDate] = useState({});
  const [visitsByRange, setVisitsByRange] = useState({});
  const [restaurantId, setRestaurantId] = useState(null);
  const userId = localStorage.getItem("userId");

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

  // range is 7 or 30 (TODO: add a select input to choose the range)
  async function getVisitsByRange() {
    const range = 7;
    const response = await fetchVisitsByRange(restaurantId, range);
    setVisitsByRange(response);
  }

  useEffect(() => {
    getRestaurantByUserId();
  }, []);

  useEffect(() => {
    if (restaurantId) {
      getTotalVisits();
      getVisitsByDate();
      getVisitsByRange();
    }
  }, [restaurantId]);

  const visitsArray = Object.entries(visitsByDate).map(([date, visits]) => ({
    date,
    visits,
  }));

  console.log("visitsByRange", visitsByRange); // de momento para que no se queje el codacy de varibale no usada

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
        </div>
      </div>
    </div>
  );
}
