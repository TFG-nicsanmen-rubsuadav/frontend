import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

// local imports
import { API_URL } from "../config";
import Button from "../components/Button";
import Ratings from "../components/Ratings";
import {
  fetchGetRestaurantCount,
  fetchUpdateRestaurantCount,
} from "../api/endpoints";
import delivery from "../assets/delivery.png";
import takeAway from "../assets/take-away.png";
import terrace from "../assets/terrace.png";

export default function RestaurantPage() {
  const [restaurant, setRestaurant] = useState({});
  const [count, setCount] = useState(0);
  const [getCount, setGetCount] = useState(0);
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

  async function onClick() {
    const response = await fetchUpdateRestaurantCount(restaurantId);
    setCount(response.message);
  }

  async function getRestaurantCount() {
    const response = await fetchGetRestaurantCount(restaurantId);
    setGetCount(response.count);
  }

  useEffect(() => {
    fetchRestaurant();
    updateVisits();
    getRestaurantCount();
  }, [count]);

  return (
    <div className=" bg-green-button flex flex-col items-center justify-center h-screen">
      <img
        src={restaurant.image}
        alt="Restaurant"
        className="mb-6 rounded-full object-cover w-32 h-32"
      />
      <h2 className="text-xl text-white font-semibold uppercase mb-10">
        {restaurant.restaurantName}
      </h2>
      <div className="text-white flex mb-5">
        {restaurant.delivery && (
          <img
            src={delivery}
            alt="delivery"
            className="w-8 h-8 m-4 filter invert"
          />
        )}
        {restaurant.takeAway && (
          <img
            src={takeAway}
            alt="takeAway"
            className="w-8 h-8 m-4 filter invert"
          />
        )}
        {restaurant.terrace && (
          <img
            src={terrace}
            alt="terrace"
            className="w-8 h-8 m-4 filter invert"
          />
        )}
      </div>
      {restaurant.ownerId ? (
        <Button
          type="button"
          text={<Link to={`/${restaurant.id}/menu`}>Nuestra carta</Link>}
        />
      ) : (
        <>
          <Button
            onClick={onClick}
            type="button"
            text="Quiero conocer el menú"
          />
          {getCount && (
            <div className="flex items-center justify-center mt-4 text-white">
              <span className="text-primary-yellow font-bold mr-1">
                {getCount}
              </span>
              personas quieren conocer tu menú
            </div>
          )}
        </>
      )}

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
