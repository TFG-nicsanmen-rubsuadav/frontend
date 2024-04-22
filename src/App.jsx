import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// local imports
// Authentication and routes
import { AuthContextProvider } from "./context/authContext";
import PublicRoute from "./context/routes/PublicRoute";
import ProtectedRoute from "./context/routes/ProtectedRoute";

// Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

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
            <Route index element={<h1>Hola Mundo</h1>} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}
