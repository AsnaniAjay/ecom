// src/utils/filters.js

/**
 * Filter products by category
 * @param {Array} products - List of products
 * @param {Array} categories - Selected categories
 * @returns {Array} Filtered products
 */
export const filterByCategory = (products, categories) => {
    if (!categories || categories.length === 0) {
      return products;
    }
    
    return products.filter(product => categories.includes(product.category));
  };
  
  /**
   * Filter products by price range
   * @param {Array} products - List of products
   * @param {Object} priceRange - Price range with min and max values
   * @returns {Array} Filtered products
   */
  export const filterByPrice = (products, priceRange) => {
    if (!priceRange || (priceRange.min === undefined && priceRange.max === undefined)) {
      return products;
    }
    
    const min = priceRange.min !== undefined ? priceRange.min : 0;
    const max = priceRange.max !== undefined ? priceRange.max : Infinity;
    
    return products.filter(product => product.price >= min && product.price <= max);
  };
  
  /**
   * Filter products by minimum rating
   * @param {Array} products - List of products
   * @param {number} minRating - Minimum rating value
   * @returns {Array} Filtered products
   */
  export const filterByRating = (products, minRating) => {
    if (!minRating || minRating <= 0) {
      return products;
    }
    
    return products.filter(product => product.rating >= minRating);
  };
  
  /**
   * Filter products by search query
   * @param {Array} products - List of products
   * @param {string} query - Search query
   * @param {Array} fields - Fields to search in (default: name, description, category)
   * @returns {Array} Filtered products
   */
  export const filterBySearch = (products, query, fields = ['name', 'description', 'category']) => {
    if (!query || query.trim() === '') {
      return products;
    }
    
    const searchQuery = query.toLowerCase().trim();
    
    return products.filter(product => {
      return fields.some(field => {
        const fieldValue = product[field];
        
        // Handle different field types
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(searchQuery);
        } else if (Array.isArray(fieldValue)) {
          return fieldValue.some(value => 
            String(value).toLowerCase().includes(searchQuery)
          );
        }
        
        return false;
      });
    });
  };
  
  /**
   * Filter products by availability (in stock)
   * @param {Array} products - List of products
   * @param {boolean} inStockOnly - Whether to show only in-stock products
   * @returns {Array} Filtered products
   */
  export const filterByStock = (products, inStockOnly) => {
    if (!inStockOnly) {
      return products;
    }
    
    return products.filter(product => product.stock > 0);
  };
  
  /**
   * Filter products by color
   * @param {Array} products - List of products
   * @param {Array} colors - Selected colors
   * @returns {Array} Filtered products
   */
  export const filterByColor = (products, colors) => {
    if (!colors || colors.length === 0) {
      return products;
    }
    
    return products.filter(product => 
      product.colors && 
      product.colors.some(color => colors.includes(color))
    );
  };
  
  /**
   * Filter products by features
   * @param {Array} products - List of products
   * @param {Array} features - Required features
   * @param {boolean} matchAll - Whether all features must match (AND logic) or any (OR logic)
   * @returns {Array} Filtered products
   */
  export const filterByFeatures = (products, features, matchAll = true) => {
    if (!features || features.length === 0) {
      return products;
    }
    
    return products.filter(product => {
      if (!product.features) return false;
      
      if (matchAll) {
        // AND logic - all selected features must be present
        return features.every(feature => 
          product.features.some(productFeature => 
            productFeature.toLowerCase().includes(feature.toLowerCase())
          )
        );
      } else {
        // OR logic - any selected feature must be present
        return features.some(feature => 
          product.features.some(productFeature => 
            productFeature.toLowerCase().includes(feature.toLowerCase())
          )
        );
      }
    });
  };
  
  /**
   * Apply multiple filters to products
   * @param {Array} products - List of products
   * @param {Object} filters - Filter criteria
   * @returns {Array} Filtered products
   */
  export const applyFilters = (products, filters) => {
    let filteredProducts = [...products];
    
    // Apply category filter
    if (filters.categories && filters.categories.length > 0) {
      filteredProducts = filterByCategory(filteredProducts, filters.categories);
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      filteredProducts = filterByPrice(filteredProducts, filters.priceRange);
    }
    
    // Apply rating filter
    if (filters.ratings && filters.ratings > 0) {
      filteredProducts = filterByRating(filteredProducts, filters.ratings);
    }
    
    // Apply search filter
    if (filters.search && filters.search.trim() !== '') {
      filteredProducts = filterBySearch(filteredProducts, filters.search);
    }
    
    // Apply stock filter
    if (filters.inStock) {
      filteredProducts = filterByStock(filteredProducts, filters.inStock);
    }
    
    // Apply color filter
    if (filters.colors && filters.colors.length > 0) {
      filteredProducts = filterByColor(filteredProducts, filters.colors);
    }
    
    // Apply features filter
    if (filters.features && filters.features.length > 0) {
      filteredProducts = filterByFeatures(filteredProducts, filters.features, filters.matchAllFeatures);
    }
    
    return filteredProducts;
  };
  
  /**
   * Get unique values for a specific field across all products
   * @param {Array} products - List of products
   * @param {string} field - Field to extract values from
   * @returns {Array} Unique values
   */
  export const getUniqueValues = (products, field) => {
    if (!products || !field) {
      return [];
    }
    
    // Handle array fields vs. simple fields
    const values = products.reduce((acc, product) => {
      const fieldValue = product[field];
      
      if (Array.isArray(fieldValue)) {
        return [...acc, ...fieldValue];
      } else if (fieldValue !== undefined && fieldValue !== null) {
        return [...acc, fieldValue];
      }
      
      return acc;
    }, []);
    
    // Remove duplicates
    return [...new Set(values)];
  };
  
  /**
   * Calculate price range for a collection of products
   * @param {Array} products - List of products
   * @returns {Object} Min and max prices
   */
  export const getPriceRange = (products) => {
    if (!products || products.length === 0) {
      return { min: 0, max: 0 };
    }
    
    const prices = products.map(product => product.price);
    
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  };