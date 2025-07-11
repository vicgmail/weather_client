import { TServerEnv, TServerList } from "../types";

export const SERVERS_LIST: TServerList = {
  localhost: {
    url: "http://localhost:3334/api",
    label: "Localhost",
  },
};

export const ENV = process.env.ENV as unknown as TServerEnv || 'localhost' as const;