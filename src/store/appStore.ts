// src/store/useAppStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createCitySlice, CitySlice } from './citySlise';

type AppState = CitySlice;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...createCitySlice(set),
    }),
    {
      name: 'app', // localStorage key
    }
  )
);
