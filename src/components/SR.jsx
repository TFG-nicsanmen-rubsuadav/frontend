import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUturnRightIcon, StarIcon } from "@heroicons/react/24/outline";

// local imports
import { useAuthContext } from "../context/useAuthContext";
import { fetchRecommendarions, fetchRestaurant } from "../api/endpoints";
import Button from "../components/Button";
import { BeatLoader } from "react-spinners";

export default function SR() {
  const { isAuthenticated } = useAuthContext();
  const [recommendations, setRecommendations] = useState([]);
  const [restaurantsLoaded, setRestaurantsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function getRecommendations() {
    setRestaurantsLoaded(true);
    const { status, recData } = await fetchRecommendarions();
    // TODO: COMPROBAR A MAÑANA SI ESTO FUNCIONA
    if (status === 403) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      // alerta emergente de sesion expirada
      console.log("Sesión expirada");
      navigate("/login");
      return;
    }
    const results = recData.recommendations;
    for (let result of results) {
      const restaurant = await fetchRestaurant(result.id);
      setRecommendations((prev) => [...prev, restaurant]);
    }
    setLoading(false);
  }

  function handleRestaurantClick(restaurant) {
    navigate(`/restaurant/${restaurant.id}`);
  }

  return (
    <div>
      {isAuthenticated && !restaurantsLoaded && (
        <Button
          text="Recomendar restaurantes"
          color="green"
          onClick={() => {
            setLoading(true);
            getRecommendations();
          }}
        />
      )}
      <div className="flex justify-center mt-5">
        {loading && <BeatLoader className="text-primary-green" />}
      </div>
      {recommendations.map((restaurant) => (
        <div
          key={restaurant.id}
          onClick={() => handleRestaurantClick(restaurant)}
          className="cursor-pointer bg-gray-label px-4 p-2 mt-2 border rounded flex justify-between items-center"
          title={`/restaurant/${restaurant.id}`}
        >
          <div className="flex items-center">
            {restaurant.restaurantName}
            {restaurant.ownerId && (
              <StarIcon className="h-5 w-5 ml-2 text-yellow-600" />
            )}
          </div>
          <ArrowUturnRightIcon className="h-5 w-5" />
        </div>
      ))}
    </div>
  );
}
