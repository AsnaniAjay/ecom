// src/components/deals/DealCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

const DealCard = ({ product, discountPercentage = 20 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate discounted price
  const originalPrice = product.price;
  const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
  
  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price / 100);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Deal Badge */}
      <div className="absolute top-0 right-0 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
        {discountPercentage}% OFF
      </div>

      <Link to={`/product/${product.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`} 
          />
          
          {/* Stock Status */}
          {product.stock < 10 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs py-1 text-center">
              {product.stock === 0 ? 'Sold Out' : `Only ${product.stock} left!`}
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-blue-600 transition">{product.name}</h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>
            <span className="text-xl font-bold text-red-600">{formatPrice(discountedPrice)}</span>
          </div>
          
          <Badge variant="danger" className="ml-2">Save {formatPrice(originalPrice - discountedPrice)}</Badge>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <button 
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition flex-grow"
          >
            Add to Cart
          </button>
          <button className="p-2 ml-2 text-gray-500 hover:text-red-500 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Progress bar for limited quantity */}
        {product.stock < 30 && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (product.stock / 30) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              {Math.round((product.stock / 30) * 100)}% of stock remaining
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealCard;