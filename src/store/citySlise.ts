export interface CitySlice {
  activeCity?: {
    id: number,
    name: string
  };
  setCity: (id: number, name: string) => void;
}

export const createCitySlice = (
  set: (fn: (state: any) => any) => void
): CitySlice => ({
  activeCity: undefined,
  setCity: (id, name) => set(() => ({ activeCity: {id, name} })),
});