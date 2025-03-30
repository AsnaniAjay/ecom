// src/utils/sortingFunctions.js

/**
 * Sort products by price (low to high)
 * @param {Array} products - List of products
 * @returns {Array} Sorted products
 */
export const sortByPriceLowToHigh = (products) => {
    return [...products].sort((a, b) => a.price - b.price);
  };
  
  /**
   * Sort products by price (high to low)
   * @param {Array} products - List of products
   * @returns {Array} Sorted products
   */
  export const sortByPriceHighToLow = (products) => {
    return [...products].sort((a, b) => b.price - a.price);
  };
  
  /**
   * Sort products by name (A-Z)
   * @param {Array} products - List of products
   * @returns {Array} Sorted products
   */
  export const sortByNameAZ = (products) => {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  };
  
  /**
   * Sort products by name (Z-A)
   * @param {Array} products - List of products
   * @returns {Array} Sorted products
   */
  export const sortByNameZA = (products) => {
    return [...products].sort((a, b) => b.name.localeCompare(a.name));
  };
  
  /**
   * Sort products by rating (high to low)
   * @param {Array} products - List of products
   * @returns {Array} Sorted products
   */
  export const sortByRating = (products) => {
    return [...products].sort((a, b) => b.rating - a.rating);
  };
  
  /**
   * Sort products by newest first (assuming higher IDs are newer)
   * @param {Array} products - List of products
   * @returns {Array} Sorted products
   */
  export const sortByNewest = (products) => {
    return [...products].sort((a, b) => b.id - a.id);
  };
  
  /**
   * Sort products by popularity (assuming a popularity field or using stock as proxy)
   * @param {Array} products - List of products
   * @param {boolean} useStockAsProxy - Whether to use stock as a proxy for popularity
   * @returns {Array} Sorted products
   */
  export const sortByPopularity = (products, useStockAsProxy = true) => {
    return [...products].sort((a, b) => {
      // If products have a popularity field, use it
      if (a.popularity !== undefined && b.popularity !== undefined) {
        return b.popularity - a.popularity;
      }
      
      // Otherwise use stock as a proxy for popularity if requested
      if (useStockAsProxy) {
        return (a.stock !== undefined && b.stock !== undefined) 
          ? a.stock - b.stock // Lower stock might mean more popular
          : 0;
      }
      
      return 0;
    });
  };
  
  /**
   * Sort products by custom order
   * @param {Array} products - List of products
   * @param {Array} orderedIds - Ordered list of product IDs
   * @returns {Array} Sorted products
   */
  export const sortByCustomOrder = (products, orderedIds) => {
    if (!orderedIds || orderedIds.length === 0) {
      return products;
    }
    
    return [...products].sort((a, b) => {
      const indexA = orderedIds.indexOf(a.id);
      const indexB = orderedIds.indexOf(b.id);
      
      // If both products are in the orderedIds list
      if (indexA >= 0 && indexB >= 0) {
        return indexA - indexB;
      }
      
      // Products in the list come before those not in the list
      if (indexA >= 0) return -1;
      if (indexB >= 0) return 1;
      
      // For products not in the list, maintain original order
      return 0;
    });
  };
  
  /**
   * Sort products by featured status
   * @param {Array} products - List of products
   * @returns {Array} Sorted products
   */
  export const sortByFeatured = (products) => {
    return [...products].sort((a, b) => {
      // If featured is a boolean flag
      if (typeof a.featured === 'boolean' && typeof b.featured === 'boolean') {
        return b.featured - a.featured;
      }
      
      // If featured is a number (priority)
      if (typeof a.featured === 'number' && typeof b.featured === 'number') {
        return a.featured - b.featured; // Lower number = higher priority
      }
      
      // If one has featured and the other doesn't
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // If neither has featured, sort by rating and then by price (low to high)
      if (a.rating !== b.rating) {
        return b.rating - a.rating;
      }
      
      return a.price - b.price;
    });
  };
  
  /**
   * Sort products by discount percentage (high to low)
   * @param {Array} products - List of products
   * @returns {Array} Sorted products
   */
  export const sortByDiscount = (products) => {
    return [...products].sort((a, b) => {
      // Calculate discount percentage if products have originalPrice and price
      const discountA = a.originalPrice 
        ? ((a.originalPrice - a.price) / a.originalPrice) * 100 
        : 0;
      
      const discountB = b.originalPrice 
        ? ((b.originalPrice - b.price) / b.originalPrice) * 100 
        : 0;
      
      return discountB - discountA;
    });
  };
  
  /**
   * Apply sort option to products
   * @param {Array} products - List of products
   * @param {string} sortOption - Sort option ID
   * @returns {Array} Sorted products
   */
  export const applySorting = (products, sortOption) => {
    if (!products || products.length === 0) {
      return [];
    }
    
    switch (sortOption) {
      case 'priceLow':
        return sortByPriceLowToHigh(products);
        
      case 'priceHigh':
        return sortByPriceHighToLow(products);
        
      case 'nameAZ':
        return sortByNameAZ(products);
        
      case 'nameZA':
        return sortByNameZA(products);
        
      case 'rating':
        return sortByRating(products);
        
      case 'newest':
        return sortByNewest(products);
        
      case 'popularity':
        return sortByPopularity(products);
        
      case 'discount':
        return sortByDiscount(products);
        
      case 'featured':
      default:
        return sortByFeatured(products);
    }
  };
  
  /**
   * Get available sort options
   * @returns {Array} Sort options with ID and label
   */
  export const getSortOptions = () => {
    return [
      { id: 'featured', label: 'Featured' },
      { id: 'priceLow', label: 'Price: Low to High' },
      { id: 'priceHigh', label: 'Price: High to Low' },
      { id: 'nameAZ', label: 'Name: A to Z' },
      { id: 'nameZA', label: 'Name: Z to A' },
      { id: 'rating', label: 'Highest Rated' },
      { id: 'newest', label: 'Newest Arrivals' },
      { id: 'popularity', label: 'Most Popular' },
      { id: 'discount', label: 'Biggest Discount' }
    ];
  };