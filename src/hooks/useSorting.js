// src/hooks/useSorting.js
import { useState, useCallback, useMemo } from 'react';

const useSorting = (initialProducts = []) => {
  // Available sort options
  const sortOptions = useMemo(() => [
    { id: 'featured', label: 'Featured' },
    { id: 'priceLow', label: 'Price: Low to High' },
    { id: 'priceHigh', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest Arrivals' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'alphabetical', label: 'Alphabetical (A-Z)' }
  ], []); // No dependencies, only created once
  
  // Current sort option
  const [sortOption, setSortOption] = useState('featured');
  
  // Change sort option
  const changeSortOption = useCallback((option) => {
    if (sortOptions.some(opt => opt.id === option)) {
      setSortOption(option);
    }
  }, [sortOptions]); // Depends on sortOptions but they don't change
  
  // Apply sorting to products
  const sortedProducts = useMemo(() => {
    if (!initialProducts.length) return [];
    
    const products = [...initialProducts]; // Create copy to avoid mutating original
    
    switch (sortOption) {
      case 'priceLow':
        return products.sort((a, b) => a.price - b.price);
        
      case 'priceHigh':
        return products.sort((a, b) => b.price - a.price);
        
      case 'newest':
        // Assuming newer products have higher IDs in this case
        // In a real application, you'd use a date field
        return products.sort((a, b) => b.id - a.id);
        
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
        
      case 'alphabetical':
        return products.sort((a, b) => a.name.localeCompare(b.name));
        
      case 'featured':
      default:
        // For featured, we can implement custom logic
        // For now, we'll keep the original order
        return products;
    }
  }, [initialProducts, sortOption]); // Recalculate when products or sort option changes
  
  return {
    sortOptions,
    sortOption,
    changeSortOption,
    sortedProducts
  };
};

export default useSorting;