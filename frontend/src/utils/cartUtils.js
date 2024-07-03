const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const toCurrency = (num) => {
  let result = num.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    // style: 'currency',
    // currency: 'INR',
  });
  // console.log(result);
  return result;
};

export const updateCart = (state) => {
  // Calculate cart item price
  state.itemsPrice = toCurrency(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate the shipping price | If items price is greater than 499, then shipping is free | If not, shipping is 50
  state.shippingPrice = addDecimals(state.itemsPrice > 499 ? 0 : 50);

  // Calculate total price
  state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));
};
