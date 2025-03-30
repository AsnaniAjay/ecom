// src/hooks/useProducts.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import productsData from '../data/products.json';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array ensures this is created only once

  // Fetch a single product by ID
  const fetchProductById = useCallback(async (productId) => {
    if (!productId) return;
    
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const numericId = parseInt(productId, 10);
      const product = productsData.find(p => p.id === numericId);
      
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
  }, []); // Empty dependency array ensures this is created only once

  // Get related products based on same category
  const getRelatedProducts = useCallback((product, limit = 4) => {
    if (!product || !products.length) return [];
    
    // Find products in the same category, excluding the current product
    const sameCategory = products.filter(
      p => p.category === product.category && p.id !== product.id
    );
    
    // If we don't have enough products in the same category, add some others
    if (sameCategory.length < limit) {
      const otherProducts = products.filter(
        p => p.category !== product.category && p.id !== product.id
      );
      
      return [...sameCategory, ...otherProducts].slice(0, limit);
    }
    
    return sameCategory.slice(0, limit);
  }, [products]); // Only depends on products array

  // Calculate product stats
  const productStats = useMemo(() => {
    if (!products.length) return {};
    
    const categories = {};
    let totalValue = 0;
    let lowestPrice = Infinity;
    let highestPrice = 0;
    let averageRating = 0;
    
    products.forEach(product => {
      // Count categories
      categories[product.category] = (categories[product.category] || 0) + 1;
      
      // Track prices
      totalValue += product.price;
      lowestPrice = Math.min(lowestPrice, product.price);
      highestPrice = Math.max(highestPrice, product.price);
      
      // Sum ratings
      averageRating += product.rating;
    });
    
    // Calculate average rating
    averageRating = products.length ? (averageRating / products.length).toFixed(1) : 0;
    
    return {
      totalProducts: products.length,
      categories,
      totalValue,
      lowestPrice,
      highestPrice,
      averageRating
    };
  }, [products]); // Only recalculate when products change

  // Load products on initial mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Include fetchProducts as dependency to satisfy exhaustive-deps

  return {
    products,
    loading,
    error,
    selectedProduct,
    fetchProducts,
    fetchProductById,
    getRelatedProducts,
    productStats
  };
};

export default useProducts;