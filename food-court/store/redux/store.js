import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorities';

export const store = configureStore({
  reducer: { favoriteMeals: favoritesReducer },
});
