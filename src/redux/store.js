import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";

// Create a Redux store with a single reducer for the cart slice
const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

// Export the Redux store
export default store;
