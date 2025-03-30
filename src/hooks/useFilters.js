// src/hooks/useFilters.js
import { useState, useEffect, useCallback, useMemo } from 'react';

const useFilters = (initialProducts = []) => {
  // Filter state
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: null,
    ratings: 0,
    inStock: false,
    search: ''
  });
  
  // Products state
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  
  // Update products when initialProducts change
  useEffect(() => {
    setProducts(initialProducts);
    // Don't update filteredProducts here to avoid applying filters twice
  }, [initialProducts]);
  
  // Extract filter metadata from products
  const filterMetadata = useMemo(() => {
    if (!products.length) {
      return {
        categories: [],
        priceRange: { min: 0, max: 100000 },
        hasData: false
      };
    }
    
    // Extract unique categories
    const categories = [...new Set(products.map(product => product.category))];
    
    // Determine price range
    const prices = products.map(product => product.price);
    const priceRange = {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
    
    return {
      categories,
      priceRange,
      hasData: true
    };
  }, [products]); // Only recalculate when products change
  
  // Initialize price range when products are loaded
  useEffect(() => {
    if (filterMetadata.hasData && !filters.priceRange) {
      setFilters(prev => ({
        ...prev,
        priceRange: filterMetadata.priceRange
      }));
    }
  }, [filterMetadata, filters.priceRange]);
  
  // Apply filters when filters or products change
  useEffect(() => {
    if (!products.length) {
      setFilteredProducts([]);
      return;
    }
    
    // Skip filtering if price range isn't initialized yet
    if (!filters.priceRange) return;
    
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
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredProducts(result);
  }, [filters, products]); // Depend on filters and products
  
  // Update specific filter
  const updateFilter = useCallback((filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  }, []); // No dependencies needed
  
  // Update multiple filters at once
  const updateFilters = useCallback((newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  }, []); // No dependencies needed
  
  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({
      categories: [],
      priceRange: filterMetadata.priceRange,
      ratings: 0,
      inStock: false,
      search: ''
    });
  }, [filterMetadata.priceRange]); // Depends on priceRange from metadata
  
  return {
    filters,
    filteredProducts,
    filterMetadata,
    updateFilter,
    updateFilters,
    resetFilters
  };
};

export default useFilters;