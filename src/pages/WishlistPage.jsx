// src/pages/WishlistPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import WishlistItem from "../components/wishlist/WishlistItem";
import EmptyState from "../components/common/EmptyState";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const WishlistPage = () => {
  const { wishlist, clearWishlist, moveAllToCart } = useWishlist();
  const { totalItems } = useCart();

  // Check if wishlist is empty
  const isEmpty = wishlist.length === 0;

  // Handle move all to cart
  const handleMoveAllToCart = () => {
    if (confirm("Are you sure you want to move all items to cart?")) {
      moveAllToCart();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {isEmpty ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <EmptyState
              title="Your wishlist is empty"
              message="Save items you like for future reference or to buy later."
              icon="heart"
              action={
                <Link
                  to="/catalog"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Explore Products
                </Link>
              }
            />

            {totalItems > 0 && (
              <div className="mt-8 text-center">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Items in your cart
                </h2>
                <p className="text-gray-600 mb-4">
                  You have {totalItems} {totalItems === 1 ? "item" : "items"} in
                  your cart.
                </p>
                <Link
                  to="/cart"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Cart
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h2 className="text-xl font-medium text-gray-900">
                  Saved Items ({wishlist.length})
                </h2>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleMoveAllToCart}
                    className="text-sm text-blue-600 hover:text-blue-800 transition"
                  >
                    Move All to Cart
                  </button>
                  <button
                    type="button"
                    onClick={clearWishlist}
                    className="text-sm text-red-600 hover:text-red-800 transition"
                  >
                    Clear Wishlist
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-0">
                {wishlist.map((item) => (
                  <WishlistItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}

        {totalItems > 0 && !isEmpty && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Ready to complete your purchase?
                </h2>
                <p className="text-gray-600 mt-1">
                  You have {totalItems} {totalItems === 1 ? "item" : "items"} in
                  your cart.
                </p>
              </div>
              <Link
                to="/cart"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}

        {/* Recommended products section could go here */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recommended For You
          </h2>
          <p className="text-gray-600">
            Based on your browsing history and wishlist items, you might also
            like:
          </p>
          <div className="mt-4 text-center">
            <Link
              to="/catalog"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Explore More Products →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
