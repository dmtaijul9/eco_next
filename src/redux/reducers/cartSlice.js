import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItem: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items = [...action.payload.items];
      state.totalItem = action.payload.totalItem;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItem = 0;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
