// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyState from '../components/common/EmptyState';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const { wishlist, wishlistCount } = useWishlist();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Handle checkout button click
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // In a real app, you would navigate to a checkout page or show a checkout form
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      alert('Order placed successfully!');
    }, 2000);
  };
  
  // Check if cart is empty
  const isEmpty = cart.length === 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        {isEmpty ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <EmptyState
              title="Your cart is empty"
              message="Looks like you haven't added any products to your cart yet."
              icon="cart"
              action={
                <Link 
                  to="/catalog" 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Start Shopping
                </Link>
              }
            />
            
            {wishlistCount > 0 && (
              <div className="mt-8 text-center">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Items in your wishlist</h2>
                <p className="text-gray-600 mb-4">
                  You have {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved for later.
                </p>
                <Link 
                  to="/wishlist" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Wishlist
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      Cart Items ({cart.length})
                    </h2>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-sm text-red-600 hover:text-red-800 transition"
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="mt-6 space-y-0">
                    {cart.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Recently viewed/suggested products would go here */}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <CartSummary onCheckout={handleCheckout} />
              
              {wishlistCount > 0 && (
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">From Your Wishlist</h2>
                  <p className="text-gray-600 mb-4">
                    You have {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} in your wishlist.
                  </p>
                  <Link 
                    to="/wishlist" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Wishlist →
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Checkout Overlay */}
        {isCheckingOut && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
              <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Processing your order</h2>
              <p className="text-gray-600">Please wait while we process your payment...</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;