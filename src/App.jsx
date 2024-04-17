import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

const App = () => (
  <Router>
    <Routes>
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<h1>Hola Mundo</h1>} />
    </Routes>
  </Router>
);

export default App;