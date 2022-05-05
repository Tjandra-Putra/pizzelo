import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // cartSlice.js is a reducer (entire file)

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
