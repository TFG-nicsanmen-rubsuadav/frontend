import { useState } from "react";
import PropTypes from "prop-types";
import ReactStars from "react-rating-stars-component";

// local imports
import { API_URL } from "../config";
import Button from "./Button";
import Google from "../assets/Google.jpg";
import TheFork from "../assets/TheFork.jpg";
import Tripadvisor from "../assets/Tripadvisor.jpg";

export default function Ratings({ restaurantId }) {
  const [ratingsLoaded, setRatingsLoaded] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [ratingsVisible, setRatingsVisible] = useState(false);

  async function getRestaurantRating() {
    const response = await fetch(
      `${API_URL}/api/restaurant/${restaurantId}/opinions?l=25`
    );
    const data = await response.json();
    setRatings(data);
    setRatingsVisible(true);
    setRatingsLoaded(true);
  }

  function loadMoreRatings() {
    setDisplayCount(displayCount + 20);
  }

  return (
    <>
      {ratingsVisible && (
        <Button
          className="mt-12"
          type="button"
          text="Ocultar Valoraciones"
          onClick={() => {
            setRatingsVisible(false);
            setRatingsLoaded(false);
            setDisplayCount(5);
          }}
        />
      )}
      <div className="w-full overflow-auto flex flex-col items-center space-y-10">
        {!ratingsLoaded ? (
          <Button
            className="mt-12"
            type="button"
            text="Valoraciones"
            onClick={() => {
              getRestaurantRating();
              setRatingsVisible(true);
            }}
          />
        ) : (
          <>
            {ratings.slice(0, displayCount).map((rating, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow mb-4 w-full md:w-1/2 mt-14 md:mb-8 mx-2 md:mx-0"
              >
                <div className="flex justify-between items-start">
                  <div className="flex justify-start items-center">
                    <p className="text-sm font-bold mr-8">
                      {rating.user} - {rating.date}
                    </p>
                    <ReactStars
                      count={5}
                      value={rating.rating}
                      size={20}
                      activeColor="#034e41"
                      isHalf={true}
                      edit={false}
                    />
                  </div>
                </div>
                <p className="text-sm mt-2">{rating.review}</p>
                <div className="flex justify-end mt-2">
                  {rating.site === "Google" && (
                    <img src={Google} alt="Google" className="h-6 w-6" />
                  )}
                  {rating.site === "TheFork" && (
                    <img src={TheFork} alt="TheFork" className="h-6 w-6" />
                  )}
                  {rating.site === "Tripadvisor" && (
                    <img
                      src={Tripadvisor}
                      alt="Tripadvisor"
                      className="h-6 w-6"
                    />
                  )}
                </div>
              </div>
            ))}
            {displayCount < ratings.length && (
              <Button
                className="mt-12"
                type="button"
                text="Leer Mas"
                onClick={loadMoreRatings}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

Ratings.propTypes = {
  restaurantId: PropTypes.string.isRequired,
};
