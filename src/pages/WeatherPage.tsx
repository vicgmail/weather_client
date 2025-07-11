import React from "react";
import { useNavigate } from "react-router";

import { Weather } from "../components/weather/Weather";
import { Button } from "primereact/button";
import { useAppStore } from "../store/appStore";

export const WeatherPage: React.FC = () => {
  const activeCity = useAppStore((s) => s.activeCity);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      <Button type="button" onClick={goHome}>Select City</Button>
      <div className="separator"></div>
      <div>Weather in <b>{activeCity?.name}</b>, UTC time</div>
      {activeCity?.id ? <Weather city={activeCity?.id.toString()} /> : null}
    </>
  );
};
