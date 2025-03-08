import { create } from 'zustand';

export const useLoaded = create((set) => ({
  isLoaded: false,
  setLoaded: (loaded) => {
    console.log('Loading State Updated:', loaded); // Debugging line
    set({ isLoaded: loaded });
  },
}));
