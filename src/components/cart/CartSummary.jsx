// src/components/cart/CartSummary.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartSummary = ({ onCheckout }) => {
  const {
    cart,
    totalItems,
    cartTotal,
    totalDiscount,
    calculateTax,
    calculateShipping,
    calculateTotal
  } = useCart();
  
  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price / 100);
  };
  
  // Calculate summary values
  const subtotal = cartTotal;
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal);
  
  // Check if cart is empty
  const isEmpty = cart.length === 0;
  
  // Handle checkout button click
  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="text-gray-900 font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        {totalDiscount > 0 && (
          <div className="flex justify-between text-red-600">
            <span>Discount</span>
            <span>-{formatPrice(totalDiscount)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (7%)</span>
          <span className="text-gray-900">{formatPrice(tax)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>
        
        {shipping > 0 && (
          <div className="text-sm text-gray-500">
            Free shipping on orders over {formatPrice(5000)}
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">{formatPrice(total)}</span>
          </div>
          
          {totalDiscount > 0 && (
            <div className="text-sm text-red-600 mt-1 text-right">
              You save: {formatPrice(totalDiscount)}
            </div>
          )}
        </div>
      </div>
      
      <button
        type="button"
        className="w-full mt-6 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleCheckout}
        disabled={isEmpty}
      >
        Proceed to Checkout
      </button>
      
      <div className="mt-4 text-center">
        <Link to="/catalog" className="text-sm text-blue-600 hover:text-blue-800">
          Continue Shopping
        </Link>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">We Accept</h3>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-12 bg-gray-200 rounded"></div>
          <div className="h-8 w-12 bg-gray-200 rounded"></div>
          <div className="h-8 w-12 bg-gray-200 rounded"></div>
          <div className="h-8 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;