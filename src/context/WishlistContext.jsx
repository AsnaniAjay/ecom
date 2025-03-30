// src/context/WishlistContext.jsx
import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useCart } from './CartContext';

// Create context
const WishlistContext = createContext();

// Custom hook to use the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

// Provider component 
export const WishlistProvider = ({ children }) => {
  const { addToCart } = useCart();
  
  // Initialize wishlist from localStorage if available
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  // Add item to wishlist
  const addToWishlist = useCallback((product) => {
    setWishlist(prevWishlist => {
      // Check if product already exists in wishlist
      const exists = prevWishlist.some(item => item.id === product.id);
      
      if (!exists) {
        // Add product to wishlist
        return [...prevWishlist, {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          image: product.image,
          stock: product.stock,
          category: product.category,
          description: product.description,
          rating: product.rating
        }];
      }
      
      // Product already in wishlist, return unchanged
      return prevWishlist;
    });
    
    return true;
  }, []);
  
  // Remove item from wishlist
  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  }, []);
  
  // Check if product is in wishlist
  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);
  
  // Clear wishlist
  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);
  
  // Move item from wishlist to cart
  const moveToCart = useCallback((productId, quantity = 1) => {
    const product = wishlist.find(item => item.id === productId);
    
    if (product) {
      // Add to cart
      const success = addToCart(product, quantity);
      
      // If successfully added to cart, remove from wishlist
      if (success) {
        removeFromWishlist(productId);
      }
      
      return success;
    }
    
    return false;
  }, [wishlist, addToCart, removeFromWishlist]);
  
  // Move all items from wishlist to cart
  const moveAllToCart = useCallback(() => {
    wishlist.forEach(product => {
      addToCart(product, 1);
    });
    
    // Clear wishlist
    clearWishlist();
  }, [wishlist, addToCart, clearWishlist]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    moveToCart,
    moveAllToCart
  }), [
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    moveToCart,
    moveAllToCart
  ]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;