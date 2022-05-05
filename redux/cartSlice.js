import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    // action.payload is basically an input/argument/parameter
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1; // refers to quantity in navbar
      state.total += action.payload.price * action.payload.quantity;
    },
    // reset current cart when users click checkout
    reset: (state) => {
      state.products = [];
      state.quantity = 0; // refers to quantity in navbar
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
