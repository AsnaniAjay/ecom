// src/components/cart/CartItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import QuantitySelector from '../common/QuantitySelector';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  
  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price / 100);
  };
  
  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };
  
  // Handle remove from cart
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  // Handle move to wishlist
  const handleMoveToWishlist = () => {
    if (!isInWishlist(item.id)) {
      addToWishlist(item);
      removeFromCart(item.id);
    }
  };
  
  // Calculate item total
  const itemTotal = item.price * item.quantity;
  
  // Calculate savings if there's an original price
  const hasSavings = item.originalPrice && item.originalPrice > item.price;
  const savingsAmount = hasSavings ? (item.originalPrice - item.price) * item.quantity : 0;
  const savingsPercentage = hasSavings ? Math.round((1 - (item.price / item.originalPrice)) * 100) : 0;

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="sm:w-24 md:w-32 h-24 md:h-32 flex-shrink-0 overflow-hidden rounded-md mb-4 sm:mb-0">
        <Link to={`/product/${item.id}`}>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      
      {/* Item Details */}
      <div className="sm:ml-4 sm:flex-1 flex flex-col">
        <div className="flex justify-between">
          <div>
            <Link to={`/product/${item.id}`}>
              <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition">{item.name}</h3>
            </Link>
            {item.category && (
              <p className="mt-1 text-sm text-gray-500">{item.category}</p>
            )}
          </div>
          
          <div className="text-right">
            <div className="text-lg font-medium text-gray-900">{formatPrice(item.price)}</div>
            {hasSavings && (
              <div className="mt-1">
                <span className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</span>
                <span className="text-sm text-red-600 ml-2">{savingsPercentage}% off</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Selector */}
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-3">Qty:</span>
            <QuantitySelector
              quantity={item.quantity}
              maxQuantity={item.stock}
              onChange={handleQuantityChange}
              size="sm"
            />
          </div>
          
          {/* Item Total */}
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">{formatPrice(itemTotal)}</div>
            {hasSavings && (
              <div className="text-sm text-red-600 mt-1">
                You save: {formatPrice(savingsAmount)}
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-end mt-4 space-x-2">
          <button
            type="button"
            onClick={handleMoveToWishlist}
            className="text-sm text-gray-600 hover:text-blue-600 transition flex items-center"
            disabled={isInWishlist(item.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            {isInWishlist(item.id) ? 'In Wishlist' : 'Save for Later'}
          </button>
          
          <span className="text-gray-300">|</span>
          
          <button
            type="button"
            onClick={handleRemove}
            className="text-sm text-gray-600 hover:text-red-600 transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;