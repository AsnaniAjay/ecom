// src/components/products/ProductDetail.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import RelatedProducts from "./RelatedProducts";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductDetail = ({ product, relatedProducts }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  // Increment quantity
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // Create cart item from product data
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price * 100, // Convert to cents to match CartItem.jsx format
      image: product.image,
      category: product.category,
      quantity: quantity,
      stock: product.stock
    };
    
    // Add to cart
    addToCart(cartItem);
    
    // Navigate to cart page
    navigate("/cart");
  };

  // Handle add to wishlist
  const handleAddToWishlist = () => {
    // Create wishlist item from product data
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price * 100, // Convert to cents to match WishlistItem.jsx format
      image: product.image,
      category: product.category,
      stock: product.stock,
      rating: product.rating,
      description: product.description
    };
    
    // Add to wishlist
    addToWishlist(wishlistItem);
    
    // Navigate to wishlist page
    navigate("/wishlist");
  };

  // Check if product is already in wishlist
  const productInWishlist = isInWishlist(product.id);

  // Get image gallery from product
  const getImageGallery = () => {
    // If product has images array, use it
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    
    // Fallback to single image with placeholders
    return [
      product.image,
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1600294037881-c80b51fa0616?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    ];
  };

  const imageGallery = getImageGallery();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden h-80 md:h-96">
              <img
                src={imageGallery[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {imageGallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-16 rounded overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div>
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
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
              <span className="text-sm text-gray-500 ml-2">
                {product.rating} stars (24 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.price > 1000 && (
                <span className="text-sm text-gray-500 ml-2">
                  or {formatPrice(Math.round(product.price / 6))} per month with
                  6 months financing
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-green-600 font-medium">
                    In Stock ({product.stock}{" "}
                    {product.stock === 1 ? "unit" : "units"})
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Colors (if available) */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Color
                </h3>
                <div className="flex space-x-2">
                  {product.colors.map((color, index) => {
                    // Map color names to color values
                    const colorMap = {
                      Black: "bg-black",
                      White: "bg-white border border-gray-300",
                      Gray: "bg-gray-500",
                      Silver: "bg-gray-300",
                      Blue: "bg-blue-500",
                      Red: "bg-red-500",
                      Green: "bg-green-500",
                      Gold: "bg-yellow-600",
                    Pink: "bg-pink-500",
                      "Rose Gold": "bg-pink-300",
                      "Space Gray": "bg-gray-700",
                      Burgundy: "bg-red-800",
                      "Stainless Steel": "bg-gray-400",
                    };

                    return (
                      <button
                        key={index}
                        className={`w-8 h-8 rounded-full ${
                          colorMap[color] || "bg-gray-200"
                        } focus:outline-none ring-2 ring-offset-2 ${
                          index === 0 ? "ring-blue-500" : "ring-transparent"
                        }`}
                        title={color}
                      ></button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Quantity
              </h3>
              <div className="flex">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center border-y border-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
              <button
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button 
                className={`w-full sm:w-auto px-6 py-3 font-medium rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${
                  productInWishlist 
                    ? "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                    : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
                }`}
                onClick={handleAddToWishlist}
                disabled={productInWishlist}
              >
                {productInWishlist ? "In Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Key Features
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Product tabs */}
        <div className="border-t border-gray-200">
          <div className="px-6 py-4 flex overflow-x-auto">
            <button
              onClick={() => handleTabChange("description")}
              className={`px-4 py-2 mr-4 whitespace-nowrap font-medium ${
                activeTab === "description"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => handleTabChange("specifications")}
              className={`px-4 py-2 mr-4 whitespace-nowrap font-medium ${
                activeTab === "specifications"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => handleTabChange("reviews")}
              className={`px-4 py-2 mr-4 whitespace-nowrap font-medium ${
                activeTab === "reviews"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews (24)
            </button>
            <button
              onClick={() => handleTabChange("shipping")}
              className={`px-4 py-2 whitespace-nowrap font-medium ${
                activeTab === "shipping"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Shipping & Returns
            </button>
          </div>
          <div className="px-6 py-4">
            {activeTab === "description" && (
              <div>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-700 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
                  aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam
                  auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
                  eget ultricies nisl nisl eget nisl.
                </p>
              </div>
            )}
            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Technical Specifications
                  </h3>
                  <table className="w-full text-left">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 text-gray-600 w-1/3">Brand</th>
                        <td className="py-2 text-gray-900">TechMart</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 text-gray-600 w-1/3">Model</th>
                        <td className="py-2 text-gray-900">
                          {product.name} Pro
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 text-gray-600 w-1/3">Color</th>
                        <td className="py-2 text-gray-900">
                          {product.colors
                            ? product.colors.join(", ")
                            : "Various"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 text-gray-600 w-1/3">Warranty</th>
                        <td className="py-2 text-gray-900">
                          1 Year Manufacturer Warranty
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Package Contents
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>1 x {product.name}</li>
                    <li>1 x User Manual</li>
                    <li>1 x Warranty Card</li>
                    {product.category === "Audio" && (
                      <li>1 x Charging Cable</li>
                    )}
                    {product.category === "Electronics" && (
                      <li>1 x Power Adapter</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-900 font-medium">
                    4.2 out of 5
                  </span>
                </div>
                <div className="text-gray-500 mb-6">Based on 24 reviews</div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-500 italic">
                    Reviews will be loaded here...
                  </p>
                </div>
              </div>
            )}
            {activeTab === "shipping" && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Shipping Information
                </h3>
                <p className="text-gray-700 mb-4">
                  We offer free standard shipping on all orders over $35.
                  Estimated delivery time is 3-5 business days.
                </p>

                <h3 className="font-medium text-gray-900 mb-2 mt-6">
                  Return Policy
                </h3>
                <p className="text-gray-700">
                  If you're not satisfied with your purchase, you can return it
                  within 30 days for a full refund. Items must be in their
                  original packaging and in unused condition.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You might also like
          </h2>
          <RelatedProducts products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;