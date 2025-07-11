import React, { useState, useEffect, useCallback, useRef } from "react";

import { Api } from "../../api";
import { TWeather } from "../../types";
import { LineChart } from "../charts/LineChart";

type Props = {
  city: string;
};

type ChartData = {
  labels: string[];
  dataset1: number[];
  dataset2: number[];
  dataset3: number[];
  dataset4: number[];
};

const defaultChartData = {
  labels: [],
  dataset1: [],
  dataset2: [],
  dataset3: [],
  dataset4: [],
};

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const PERIOD_REFRESH_WEATHER_IN_SEC = 60;

export const Weather: React.FC<Props> = ({city}) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartData>({...defaultChartData});

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const actualTimeRef = useRef<number>(0);

  const getWeather = useCallback(async () => {
    console.log('GET WEATHER DATA');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const data = await Api.getWeather(city, actualTimeRef.current);
    
    if (!Array.isArray(data) || !data.length) {
      timeoutRef.current = setTimeout(() => {
        getWeather();
      }, 1000 * PERIOD_REFRESH_WEATHER_IN_SEC);

      return;
    }

    const cData: ChartData = {labels: [], dataset1: [], dataset2: [], dataset3: [], dataset4: []};
    data.forEach((w: TWeather) => {
      const actualDate = new Date(w.createdAt * 1000);
      cData.labels.push(`${actualDate.getDate()}${MONTHS[actualDate.getMonth()]} ${actualDate.getHours()}h`);
      cData.dataset1.push(w.minT);
      cData.dataset2.push(w.maxT);
      cData.dataset3.push(w.openT);
      cData.dataset4.push(w.closeT || w.openT);
    });

    setChartData((prevChartData: ChartData) => {
      if (actualTimeRef.current) {
        return {
          labels: [...prevChartData.labels, ...cData.labels],
          dataset1: [...prevChartData.dataset1, ...cData.dataset1],
          dataset2: [...prevChartData.dataset2, ...cData.dataset2],
          dataset3: [...prevChartData.dataset3, ...cData.dataset3],
          dataset4: [...prevChartData.dataset4, ...cData.dataset4],
        };
      }

      return cData;
    });

    actualTimeRef.current = data[data.length - 1].createdAt;

    timeoutRef.current = setTimeout(() => {
      getWeather();
    }, 1000 * PERIOD_REFRESH_WEATHER_IN_SEC);
  }, [city]);

  useEffect(() => {
    setLoading(true);
    getWeather();
    setLoading(false);
  }, [getWeather]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    !isLoading && <div className="d-flex justify-content-center p-4">
      <LineChart labels={chartData.labels} dataset1={chartData.dataset1} dataset2={chartData.dataset2} dataset3={chartData.dataset3} dataset4={chartData.dataset4} />
    </div>
  );
};
