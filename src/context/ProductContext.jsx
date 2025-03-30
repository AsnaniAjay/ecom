// src/context/ProductContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import productsData from '../data/products.json';

// Create context
const ProductContext = createContext();

// Custom hook to use the product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Fetch products - in a real app, this would be an API call
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array ensures this function is created only once
  
  // Fetch product by ID
  const fetchProductById = useCallback(async (productId) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const product = productsData.find(p => p.id === parseInt(productId));
      if (product) {
        setSelectedProduct(product);
        setError(null);
      } else {
        setError('Product not found');
        setSelectedProduct(null);
      }
    } catch (err) {
      setError('Failed to fetch product details');
      console.error('Error fetching product details:', err);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array ensures this function is created only once
  
  // Get related products
  const getRelatedProducts = useCallback((product, limit = 4) => {
    if (!product || !products.length) return [];
    
    // Find products in the same category, excluding the current product
    const categoryProducts = products.filter(
      p => p.category === product.category && p.id !== product.id
    );
    
    // If there aren't enough products in the same category, add from other categories
    if (categoryProducts.length < limit) {
      const otherProducts = products.filter(
        p => p.category !== product.category && p.id !== product.id
      );
      
      return [...categoryProducts, ...otherProducts].slice(0, limit);
    }
    
    return categoryProducts.slice(0, limit);
  }, [products]); // Only depends on products array
  
  // Initial products fetch on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Include fetchProducts as dependency to avoid lint warnings
  
  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    products,
    loading,
    error,
    selectedProduct,
    fetchProducts,
    fetchProductById,
    getRelatedProducts
  }), [
    products, 
    loading, 
    error, 
    selectedProduct, 
    fetchProducts, 
    fetchProductById, 
    getRelatedProducts
  ]);
  
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;