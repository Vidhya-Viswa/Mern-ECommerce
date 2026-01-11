import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.find(f => f._id === action.payload._id)) state.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      return state.filter(f => f._id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;