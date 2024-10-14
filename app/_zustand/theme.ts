import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { light } from '../_context/theme'

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: light,
    }),
    {
      name: 'theme-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
