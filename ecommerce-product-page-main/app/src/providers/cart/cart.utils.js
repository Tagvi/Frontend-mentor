export const addItem = (item, cartItems) => {
  const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
  if (itemInCart) {
    return cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
        : cartItem
    );
  }
  return [...cartItems, item];
};
export const clearItem = (item, cartItems) => {
  return cartItems.filter((cartItem) => cartItem.id !== item.id);
};
export const calcTotal = (cartItems) => {
  return cartItems.reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0
  );
};
export const getItemCount = (cartItems) => {
  return cartItems.reduce((acc, { quantity }) => acc + quantity, 0);
};
