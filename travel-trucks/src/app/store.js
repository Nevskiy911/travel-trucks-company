import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "../features/campers/campersSlice";
import favoritesReducer from "../features/campers/favoritesSlice";

const saveToLocalStorage = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState();
  localStorage.setItem("favorites", JSON.stringify(state.favorites.items));
  return result;
};

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage),
});
