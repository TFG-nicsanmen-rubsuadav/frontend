import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// local imports
// Authentication and routes
import { AuthContextProvider } from "./context/authContext";
import PublicRoute from "./context/routes/PublicRoute";
import ProtectedRoute from "./context/routes/ProtectedRoute";

// Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import RestaurantPage from "./pages/RestaurantPage";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/:restaurantId/menu" element={<MenuPage />} />
            <Route
              path="/restaurant/:restaurantId"
              element={<RestaurantPage />}
            />
            <Route index element={<LandingPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}
