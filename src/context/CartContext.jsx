import React, { useContext } from "react";
import { getProductById } from "../data/products";
const CartContext = React.createContext(null);
export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = React.useState([]);
  function addToCart(productId) {
    const existing = cartItems.find((p) => p.id === productId);
    if (existing) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === productId
          ? { id: productId, quantity: item.quantity + 1 }
          : item,
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }
  function getCartItemsWithProducts() {
    return cartItems
      .map((item) => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter((item) => item.product);
  }
  function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id != productId));
  }
  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }
  function getCartTotal() {
    const total = cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
    return total;
  }
  function clearCart() {
    setCartItems([]);
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  return context;
}
