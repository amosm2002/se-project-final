import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the cart
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

// Create a Redux slice for managing the cart
const cartSlice = createSlice({
  name: "cart",
  initialState,

  // Define a set of reducer functions for updating the state
  reducers: {
    // Reducer function for adding an item to the cart
    addItem: (state, action) => {
      // Extract the new item from the action payload
      const newItem = action.payload;

      // Check if the item is already in the cart
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      // Increment the total quantity of items in the cart
      state.totalQuantity++;

      // If the item is not already in the cart, add it
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        // If the item is already in the cart, increment its quantity and total price
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      // Calculate the new total amount for the cart
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    // Reducer function for deleting an item from the cart
    deleteItem: (state, action) => {
      // Extract the ID of the item to delete from the action payload
      const id = action.payload;

      // Find the item in the cart
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        // Remove the item from the cart
        state.cartItems = state.cartItems.filter((item) => item.id !== id);

        // Decrement the total quantity of items in the cart by the quantity of the deleted item
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      // Calculate the new total amount for the cart
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
  },
});

// Export the reducer and action creators generated by the slice
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;