export type TServerEnv = 'localhost';
export type TServerList = Record<TServerEnv, {url: string, label: string}>;

export type TCity = {id: number, name: string};
export type TCityOption = {code: number, name: string};

export type TWeather = {id: number, minT: number, maxT: number, openT: number, closeT?: number, createdAt: number};
