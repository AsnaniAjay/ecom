// src/components/products/ProductList.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate stock status
  const stockStatus = (stock) => {
    if (stock <= 0)
      return { text: "Out of Stock", class: "bg-red-100 text-red-800" };
    if (stock < 10)
      return { text: "Low Stock", class: "bg-yellow-100 text-yellow-800" };
    return { text: "In Stock", class: "bg-green-100 text-green-800" };
  };

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Product Image */}
          <Link
            to={`/product/${product.id}`}
            className="sm:w-48 md:w-56 lg:w-64 h-48 flex-shrink-0"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Product Details */}
          <div className="flex flex-col flex-grow p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
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
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.rating})
                  </span>
                </div>
                <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {product.category}
                </span>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                <span
                  className={`ml-2 inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    stockStatus(product.stock).class
                  }`}
                >
                  {stockStatus(product.stock).text}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4 flex-grow">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-auto">
              <button
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
              <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md border border-blue-600 hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                View Details
              </button>
              <button className="px-4 py-2 bg-white text-gray-600 font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-1">Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
