import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";

// local imports
import { fetchAllCities, fetchSearchRestaurants } from "../api/endpoints";

export default function SearchBar() {
  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({
    name: "",
    city: "",
  });
  const [errors, setErrors] = useState("");
  let navigate = useNavigate();

  async function getCities() {
    const cities = await fetchAllCities();
    setCities(cities.cities);
  }

  useEffect(() => {
    getCities();
  }, []);

  const { name, city } = form;

  function onInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors("");
    setRestaurants([]);
  }

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { status, data } = await fetchSearchRestaurants(name, city);
      switch (status) {
        case 200:
          setRestaurants(data);
          break;
        case 400:
          setErrors(data.message);
          setRestaurants([]);
          break;
      }
    };

    if (name || city) {
      fetchRestaurants();
    }
  }, [name, city]);

  function handleRestaurantClick(restaurant) {
    navigate(`/restaurant/${restaurant.id}`);
  }

  return (
    <div className="mb-28 mt-28">
      <form className="relative" onSubmit={(e) => e.preventDefault()}>
        <input
          className="bg-bg-custom rounded-xl shadow-md h-12 w-full md:w-96 text-base font-semibold text-justify pl-4"
          placeholder="Nombre del restaurante"
          name="name"
          value={name}
          onChange={(e) => onInputChange(e)}
        />
        <select
          className="bg-bg-custom rounded-xl shadow-md h-12 md:w-auto text-base font-bold ml-5 text-center"
          name="city"
          value={city}
          onChange={(e) => onInputChange(e)}
        >
          <option value="">Seleccione una ciudad</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </form>
      {errors && <p className="mt-2 text-sm text-red-600">{errors}</p>}
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          onClick={() => handleRestaurantClick(restaurant)}
          className="cursor-pointer bg-white p-2 mt-2 border rounded"
          title={`/restaurant/${restaurant.id}`}
        >
          <div className="flex items-center">
            {restaurant.restaurantName}
            {restaurant.ownerId && (
              <span className="inline-flex ml-2">
                <StarIcon className="w-5 h-5 text-yellow-600" />
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
