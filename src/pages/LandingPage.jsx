import { useEffect, useState } from "react";
import {
  BuildingOffice2Icon,
  ChatBubbleOvalLeftEllipsisIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

// local imports
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { fetchScrapingData } from "../api/endpoints";
import SR from "../components/SR";

export default function LandingPage() {
  const [restaurants, setRestaurants] = useState({});
  const [cities, setCities] = useState({});
  const [opinions, setOpinions] = useState({});

  async function fetchAllData() {
    const data = await fetchScrapingData();
    setRestaurants(data);
    setCities(data);
    setOpinions(data);
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="mb-16">
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <SearchBar />
        <SR />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-24 mt-14">
          <div className="bg-bg-custom rounded-xl shadow-md flex flex-col items-center justify-center h-32 w-full sm:w-44">
            <BuildingOffice2Icon className="h-10 w-10" />
            <h1 className="font-bold text-3xl text-center">
              {restaurants.restaurants}
            </h1>
            <h3 className="text-sm font-semibold">RESTAURANTES</h3>
          </div>
          <div className="bg-bg-custom rounded-xl shadow-md flex flex-col items-center justify-center h-32 w-full sm:w-40">
            <MapPinIcon className="h-10 w-10" />
            <h1 className="font-bold text-3xl text-center">{cities.cities}</h1>
            <h3 className="text-sm font-semibold">CIUDADES</h3>
          </div>
          <div className="bg-bg-custom rounded-xl shadow-md flex flex-col items-center justify-center h-32 w-full sm:w-40">
            <ChatBubbleOvalLeftEllipsisIcon className="h-10 w-10" />
            <h1 className="font-bold text-3xl text-center">
              {opinions.opinions}
            </h1>
            <h3 className="text-sm font-semibold">OPINIONES</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
