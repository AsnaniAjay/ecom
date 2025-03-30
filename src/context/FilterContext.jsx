// src/context/FilterContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useProducts } from './ProductContext';

// Create context
const FilterContext = createContext();

// Custom hook to use the filter context
export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

// Provider component
export const FilterProvider = ({ children }) => {
  const { products } = useProducts();
  
  // Filter state
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 100000 },
    ratings: 0,
    inStock: false,
    search: ''
  });
  
  // Sort state
  const [sortOption, setSortOption] = useState('featured');
  
  // Filtered products state
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Get unique categories and price range from products
  const { categories, priceRange } = useMemo(() => {
    if (!products.length) return { categories: [], priceRange: { min: 0, max: 100000 } };
    
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    
    const prices = products.map(product => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return {
      categories: uniqueCategories,
      priceRange: { min: minPrice, max: maxPrice }
    };
  }, [products]);
  
  // Initialize price range when products are loaded
  useEffect(() => {
    if (products.length && filters.priceRange.max === 100000) {
      setFilters(prev => ({
        ...prev,
        priceRange: priceRange
      }));
    }
  }, [products, priceRange, filters.priceRange.max]);
  
  // Apply filters and sorting
  useEffect(() => {
    if (!products.length) {
      setFilteredProducts([]);
      return;
    }
    
    let result = [...products];
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => filters.categories.includes(product.category));
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    );
    
    // Apply rating filter
    if (filters.ratings > 0) {
      result = result.filter(product => product.rating >= filters.ratings);
    }
    
    // Apply in-stock filter
    if (filters.inStock) {
      result = result.filter(product => product.stock > 0);
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, you'd likely have a timestamp
        result.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'alphabetical':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Use the original order for featured items
        break;
    }
    
    setFilteredProducts(result);
  }, [filters, sortOption, products]);
  
  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);
  
  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      categories: [],
      priceRange: priceRange,
      ratings: 0,
      inStock: false,
      search: ''
    });
    setSortOption('featured');
  }, [priceRange]);
  
  // Update sort option
  const updateSortOption = useCallback((option) => {
    setSortOption(option);
  }, []);
  
  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    filters,
    sortOption,
    filteredProducts,
    categories,
    priceRange,
    updateFilters,
    resetFilters,
    updateSortOption
  }), [
    filters,
    sortOption,
    filteredProducts,
    categories,
    priceRange,
    updateFilters,
    resetFilters,
    updateSortOption
  ]);
  
  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;