import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePaginationStore = create(
  persist(
    (state) => ({
      current: 0,
      next: 1,
      back: 0,
    }),
    {
      name: "theme-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
