import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

// local imports
import { API_URL } from "../config";
import Button from "../components/Button";
import Ratings from "../components/Ratings";

export default function RestaurantPage() {
  const [restaurant, setRestaurant] = useState({});
  const { restaurantId } = useParams();

  async function fetchRestaurant() {
    const response = await fetch(`${API_URL}/api/restaurant/${restaurantId}`);
    const data = await response.json();
    setRestaurant(data);
  }

  async function updateVisits() {
    const response = await fetch(
      `${API_URL}/api/restaurant/${restaurantId}/visit`
    );
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    fetchRestaurant();
    updateVisits();
  }, []);

  return (
    <div className=" bg-green-button flex flex-col items-center justify-center h-screen">
      <img
        src={restaurant.image}
        alt="Restaurant"
        className="mb-6 rounded-full object-cover w-32 h-32"
      />
      <h2 className="text-xl text-white font-semibold uppercase mb-12">
        {restaurant.restaurantName}
      </h2>
      <Button
        type="button"
        text={<Link to={`/${restaurant.id}/menu`}>Nuestra carta</Link>}
      />
      <Ratings restaurantId={restaurantId} />
      <div className="mt-12 flex flex-col items-center">
        <div className="flex items-center justify-center">
          <MapPinIcon className="h-6 w-6 text-primary-yellow " />
          <p className="ml-2 text-white">{restaurant.fullAddress}</p>
        </div>
        <div className="flex items-center mt-4">
          <PhoneIcon className="h-6 w-6 text-primary-yellow" />
          <p className="ml-2 text-white">{restaurant.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}
