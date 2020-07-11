import React, { createContext, useState, useEffect } from "react";

import {
  addItemToCart,
  removeItemFromCart,
  filterItemsInCart,
  getCartItemCount,
  getCartTotal,
} from "./cart.utils";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  cartTotal: 0,
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const toggleHidden = () => setHidden(!hidden);
  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));

  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));

  const clearItemFromCart = (item) =>
    setCartItems(filterItemsInCart(cartItems, item));

  useEffect(() => {
    setCartItemsCount(getCartItemCount(cartItems));
    setCartTotal(getCartTotal(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        cartItemsCount,
        removeItem,
        clearItemFromCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
