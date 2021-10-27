import { createContext, useState, useEffect } from 'react';
import { addItem, clearItem, calcTotal, getItemCount } from './cart.utils';

export const CartContext = createContext({
  cartHidden: true,
  total: 0,
  itemCount: 0,
  cartItems: [],
  toggleCartHidden: () => {},
  addItemToCart: () => {},
  clearItemFromCart: () => {},
});

const CartProvider = ({ children }) => {
  const [cartHidden, setCartHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const toggleCartHidden = () => {
    setCartHidden(!cartHidden);
  };
  const addItemToCart = (item) => {
    setCartItems(addItem(item, cartItems));
  };
  const clearItemFromCart = (item) => {
    setCartItems(clearItem(item, cartItems));
  };
  useEffect(() => {
    setTotal(calcTotal(cartItems));
    setItemCount(getItemCount(cartItems));
  }, [cartItems, setTotal]);

  return (
    <CartContext.Provider
      value={{
        cartHidden,
        total,
        itemCount,
        cartItems,
        toggleCartHidden,
        addItemToCart,
        clearItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
