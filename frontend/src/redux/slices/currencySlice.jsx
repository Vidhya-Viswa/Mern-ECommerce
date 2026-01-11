import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
  name: 'currency',
  initialState: { currency: 'USD', rate: 1 }, // USD default
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload.currency;
      state.rate = action.payload.rate;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;