import Navbar from "../components/Navbar";
import SectionsScroll from "../components/SectionsScroll";

export default function MenuPage() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <SectionsScroll />
      </div>
    </div>
  );
}
