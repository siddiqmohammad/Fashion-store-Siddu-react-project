import { createSlice } from "@reduxjs/toolkit";

const savedFavorites = JSON.parse(localStorage.getItem("sidThreadFavorites") || "[]");

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: savedFavorites,
  reducers: {
    toggleFavorite: (state, action) => {
      const exists = state.some(product => String(product.id) === String(action.payload.id));
      const next = exists
        ? state.filter(product => String(product.id) !== String(action.payload.id))
        : [...state, action.payload];

      localStorage.setItem("sidThreadFavorites", JSON.stringify(next));
      return next;
    },
    removeFavorite: (state, action) => {
      const next = state.filter(product => String(product.id) !== String(action.payload));
      localStorage.setItem("sidThreadFavorites", JSON.stringify(next));
      return next;
    },
    clearFavorites: () => {
      localStorage.removeItem("sidThreadFavorites");
      return [];
    }
  }
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
