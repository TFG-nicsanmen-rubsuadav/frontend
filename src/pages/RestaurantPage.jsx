import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

// local imports
import { API_URL } from "../config";
import Button from "../components/Button";

export default function RestaurantPage() {
  const [restaurant, setRestaurant] = useState({});

  // TODO: EL ID DEL RESTAURANTE DEBE SER DINÁMICO
  async function fetchRestaurant() {
    const response = await fetch(
      `${API_URL}/api/restaurant/3bdGxrc3e1yFzHcVGw5Y`
    );
    const data = await response.json();
    setRestaurant(data);
  }

  useEffect(() => {
    fetchRestaurant();
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
      <Button className="mt-12" type="button" text="Carta en imágenes" />
      <Button className="mt-12" type="button" text="Valoraciones" />
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
