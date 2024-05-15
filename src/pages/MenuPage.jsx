import { useParams } from "react-router-dom";

// local imports
import Navbar from "../components/Navbar";
import SectionsScroll from "../components/SectionsScroll";
import Menu from "../components/Menu";

export default function MenuPage() {
  const { restaurantId } = useParams();
  return (
    <div>
      <Navbar />
      <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <SectionsScroll restaurantId={restaurantId} />
      </div>
      <div>
        <Menu restaurantId={restaurantId} />
      </div>
    </div>
  );
}
