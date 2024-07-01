import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.cartItems = [...state.cartItems, item];

      // Calculate cart item price
      state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item, 0);

      // Calculate the shipping price | If items price is greater than 499, then shipping is free | If not, shipping is 50
      state.shippingPrice = addDecimals(state.itemsPrice > 499 ? 0 : 50);

      // Calculate total price
      state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
