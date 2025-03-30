// src/utils/formatters.js

/**
 * Format a price value to a currency string
 * @param {number} price - The price value in cents
 * @param {string} currency - The currency code (default: USD)
 * @param {boolean} showCents - Whether to show cents (default: true)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'USD', showCents = true) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: showCents ? 2 : 0,
      maximumFractionDigits: showCents ? 2 : 0
    });
    
    return formatter.format(price / 100);
  };
  
  /**
   * Format a date string or timestamp
   * @param {string|number|Date} date - The date to format
   * @param {string} format - The format style ('short', 'medium', 'long', 'full')
   * @returns {string} Formatted date string
   */
  export const formatDate = (date, format = 'medium') => {
    const dateObj = new Date(date);
    
    const options = {
      short: { month: 'numeric', day: 'numeric', year: '2-digit' },
      medium: { month: 'short', day: 'numeric', year: 'numeric' },
      long: { month: 'long', day: 'numeric', year: 'numeric' },
      full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    };
    
    return new Intl.DateTimeFormat('en-US', options[format]).format(dateObj);
  };
  
  /**
   * Format a number with commas as thousands separators
   * @param {number} number - The number to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted number string
   */
  export const formatNumber = (number, decimals = 0) => {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };
  
  /**
   * Format product rating to display stars
   * @param {number} rating - The rating value (0-5)
   * @param {number} maxRating - Maximum possible rating (default: 5)
   * @returns {string} Star representation of rating
   */
  export const formatRating = (rating, maxRating = 5) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
  };
  
  /**
   * Format a string to title case (capitalize first letter of each word)
   * @param {string} text - The text to format
   * @returns {string} Title-cased text
   */
  export const toTitleCase = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  /**
   * Format bytes to a human-readable string (KB, MB, GB)
   * @param {number} bytes - The number of bytes
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted file size
   */
  export const formatFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  };
  
  /**
   * Truncate text with ellipsis if it exceeds max length
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum allowed length
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  /**
   * Format a phone number to a standard format
   * @param {string} phoneNumber - The raw phone number
   * @returns {string} Formatted phone number
   */
  export const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if the number is valid
    if (cleaned.length !== 10) {
      return phoneNumber;
    }
    
    // Format as (XXX) XXX-XXXX
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  };
  
  /**
   * Convert a camelCase string to a human-readable string
   * @param {string} text - The camelCase text
   * @returns {string} Human-readable text
   */
  export const camelCaseToHuman = (text) => {
    if (!text) return '';
    
    // Add space before capital letters and uppercase the first character
    const result = text
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
    
    return result;
  };