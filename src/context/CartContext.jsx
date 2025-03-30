// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';

// Create context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Derive total items and cart total
  const { totalItems, cartTotal, totalDiscount } = useMemo(() => {
    return cart.reduce(
      (acc, item) => ({
        totalItems: acc.totalItems + item.quantity,
        cartTotal: acc.cartTotal + (item.price * item.quantity),
        totalDiscount: acc.totalDiscount + ((item.originalPrice || item.price) - item.price) * item.quantity
      }),
      { totalItems: 0, cartTotal: 0, totalDiscount: 0 }
    );
  }, [cart]);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Add item to cart
  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Create a new array with the updated item
        const newCart = [...prevCart];
        const newQuantity = newCart[existingItemIndex].quantity + quantity;
        
        // Check if quantity exceeds stock
        if (newQuantity > product.stock) {
          // Don't exceed available stock
          newCart[existingItemIndex].quantity = product.stock;
        } else {
          newCart[existingItemIndex].quantity = newQuantity;
        }
        
        return newCart;
      } else {
        // Add new item to cart
        return [...prevCart, { 
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          image: product.image,
          quantity: Math.min(quantity, product.stock),
          stock: product.stock,
          category: product.category
        }];
      }
    });
    
    // Return true to indicate success (can be used for showing confirmation)
    return true;
  }, []);
  
  // Remove item from cart
  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);
  
  // Update item quantity
  const updateQuantity = useCallback((productId, quantity) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId
          ? { ...item, quantity: Math.min(Math.max(1, quantity), item.stock) }
          : item
      )
    );
  }, []);
  
  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);
  
  // Check if product is in cart
  const isInCart = useCallback((productId) => {
    return cart.some(item => item.id === productId);
  }, [cart]);
  
  // Get item quantity in cart
  const getItemQuantity = useCallback((productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [cart]);
  
  // Calculate taxes (for example, 7% tax)
  const calculateTax = useCallback((subtotal) => {
    return subtotal * 0.07;
  }, []);
  
  // Calculate shipping (free for orders over $5000, otherwise $500)
  const calculateShipping = useCallback((subtotal) => {
    return subtotal > 5000 ? 0 : 500;
  }, []);
  
  // Calculate order total
  const calculateTotal = useCallback((subtotal) => {
    const tax = calculateTax(subtotal);
    const shipping = calculateShipping(subtotal);
    return subtotal + tax + shipping;
  }, [calculateTax, calculateShipping]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    cart,
    totalItems,
    cartTotal,
    totalDiscount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    calculateTax,
    calculateShipping,
    calculateTotal
  }), [
    cart,
    totalItems,
    cartTotal,
    totalDiscount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    calculateTax,
    calculateShipping,
    calculateTotal
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;