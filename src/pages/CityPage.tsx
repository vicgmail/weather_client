import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";

import "./Pages.scss";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Api } from "../api";
import { TCity, TCityOption } from "../types";
import { useAppStore } from "../store/appStore";

export const CityPage: React.FC = () => {
  const setCity = useAppStore((s) => s.setCity);
  const [cities, setCities] = useState<TCityOption[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number>(0);
  
  useEffect(() => {
    async function getData() {
      const citiesData = await Api.getCities();
      if (!citiesData) {
        setCities([]);
      }
      const cities = citiesData!.map((city: TCity) => ({
        code: city.id,
        name: city.name,
      }));
      setCities(cities);
    };
    getData();
  }, []);

  return selectedCityId ? (
    <Navigate to={`/weather/${selectedCityId}`}></Navigate>
  ) : (
    <div className="card flex justify-content-center">
      <Panel header="Weather in city" className="loginBox">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-column gap-2">
            <label htmlFor="username">City</label>
            <Dropdown
              onChange={(e: DropdownChangeEvent) => {
                setCity(e.value.code, e.value.name);
                setSelectedCityId(e.value.code);
              }}
              options={cities}
              optionLabel="name"
              placeholder="Select a city"
            />
          </div>
          <div className="separator"></div>
          <div className="p-inputgroup">
            <Button type="submit">Show Weather</Button>
          </div>
        </form>
      </Panel>
    </div>
  );
};
