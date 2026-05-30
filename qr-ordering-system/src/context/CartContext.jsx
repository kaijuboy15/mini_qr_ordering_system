import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product_id === product.product_id);
      if (existing) {
        // if already in cart, just increase quantity
        return prev.map(item =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // new item, add with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (product_id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.product_id === product_id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (product_id) => {
    setCartItems(prev => prev.filter(item => item.product_id !== product_id));
  };

  const clearCart = () => setCartItems([]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      totalAmount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}