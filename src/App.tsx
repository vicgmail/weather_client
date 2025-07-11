import React from "react";
import { Routes, Route } from "react-router-dom";

import { WeatherPage } from "./pages/WeatherPage";
import { CityPage } from "./pages/CityPage";

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<CityPage />} />
    <Route path="/weather/:city" element={<WeatherPage />} />
  </Routes>
);
