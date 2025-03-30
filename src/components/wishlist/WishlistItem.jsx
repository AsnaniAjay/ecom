// src/components/wishlist/WishlistItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

const WishlistItem = ({ item }) => {
  const { removeFromWishlist, moveToCart } = useWishlist();

  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  // Handle remove from wishlist
  const handleRemove = () => {
    removeFromWishlist(item.id);
  };

  // Handle move to cart
  const handleMoveToCart = () => {
    moveToCart(item.id);
  };

  // Check if item is in stock
  const isInStock = item.stock > 0;

  // Calculate price difference if there's an original price
  const hasSavings = item.originalPrice && item.originalPrice > item.price;
  const savingsPercentage = hasSavings
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : 0;

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
              <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition">
                {item.name}
              </h3>
            </Link>
            {item.category && (
              <p className="mt-1 text-sm text-gray-500">{item.category}</p>
            )}

            {/* Stock Status */}
            <div className="mt-2">
              {isInStock ? (
                <span className="text-sm text-green-600">In Stock</span>
              ) : (
                <span className="text-sm text-red-600">Out of Stock</span>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-medium text-gray-900">
              {formatPrice(item.price)}
            </div>
            {hasSavings && (
              <div className="mt-1">
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(item.originalPrice)}
                </span>
                <span className="text-sm text-red-600 ml-2">
                  {savingsPercentage}% off
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(item.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({item.rating})</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end mt-4 space-x-2">
          <button
            type="button"
            onClick={handleMoveToCart}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            disabled={!isInStock}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add to Cart
          </button>

          <button
            type="button"
            onClick={handleRemove}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
