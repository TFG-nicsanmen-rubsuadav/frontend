import PropTypes from "prop-types";

// local imports
import { allergenImageMap } from "../utils/constants";

export default function AllergenImage({ allergenName }) {
  return (
    <img
      src={allergenImageMap[allergenName]}
      alt={allergenName}
      className="w-6 h-6 rounded-full"
    />
  );
}

AllergenImage.propTypes = {
  allergenName: PropTypes.string.isRequired,
};
