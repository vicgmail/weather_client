import axios, { Method } from "axios";

import { ENV, SERVERS_LIST } from "../constants";
import { TCity, TServerEnv, TWeather } from "../types";

export class Api {
  private static getServerUrl(server: TServerEnv): string {
    return SERVERS_LIST[server].url;
  }

  static getCities(): Promise<TCity[] | null> {
    return Api.request<TCity[]>(
      `/city`,
      "GET"
    );
  }

  static getWeather(idCity: string, time?: number): Promise<TWeather[] | null> {
    let url = `/weather/${idCity}/init`;

    if (time) {
      url = `/weather/${idCity}/newStat/${time}`;
    }

    return Api.request<TWeather[]>(url, "GET");
  }
  
  private static request<T>(
    path: string,
    method: Method,
    data?: any
  ): Promise<T | null> {
    return new Promise((resolve) => {
      const serverUrl = this.getServerUrl(ENV);

      axios(`${serverUrl}${path}`, {
        method,
        headers: {
          // Authorization: `Bearer ${user.jwt}`,
        },
        data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch(() => {
          resolve(null);
        });
    });
  }
}
