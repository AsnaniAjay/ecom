// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/products/ProductCard';
import Badge from '../components/ui/Badge';
import Loading from '../components/ui/Loading';
import useProducts  from '../hooks/useProducts';

const HomePage = () => {
  const { products, loading } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Get featured products (top rated products)
      const topRated = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
      setFeaturedProducts(topRated);

      // Get new arrivals (assuming higher IDs are newer products)
      const newest = [...products]
        .sort((a, b) => b.id - a.id)
        .slice(0, 8);
      setNewArrivals(newest);

      // Get unique categories with their counts
      const categoryCounts = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {});

      setCategories(Object.entries(categoryCounts).map(([name, count]) => ({ name, count })));
    }
  }, [products]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Discover the Latest Tech Innovations</h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">Find the perfect gadgets and electronics for your lifestyle.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/catalog" className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition duration-300 text-center">
                  Shop Now
                </Link>
                <Link to="/categories" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition duration-300 text-center">
                  Explore Categories
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {loading ? (
                  <Loading type="spinner" color="white" fullPage={false} />
                ) : featuredProducts.slice(0, 4).map((product, index) => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 transform transition-transform hover:scale-105 ${
                      index % 2 === 0 ? 'mt-4' : 'mb-4'
                    }`}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-32 object-contain mb-2"
                    />
                    <h3 className="text-sm font-medium truncate">{product.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-bold">${(product.price / 100).toFixed(2)}</span>
                      <Badge variant="primary" size="sm">New</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Wave SVG for bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
            <path d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,69.3C1120,64,1280,64,1360,64L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop by Category</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loading type="spinner" text="Loading categories..." />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  to={`/catalog?category=${category.name}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
                      {category.name === 'Electronics' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {category.name === 'Audio' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 017.072 0m-9.9-2.828a9 9 0 0112.728 0" />
                        </svg>
                      )}
                      {category.name === 'Accessories' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      )}
                      {category.name === 'Wearables' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-lg font-medium mb-1">{category.name}</h3>
                    <p className="text-gray-500 text-sm">{category.count} Products</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
            <Link to="/catalog?sort=newest" className="text-blue-600 hover:text-blue-800 font-medium">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loading type="spinner" text="Loading products..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="block">
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Special Offer</h2>
              <p className="text-lg text-gray-300 mb-6">Get up to 40% off on selected electronics. Limited time offer.</p>
              <Link 
                to="/catalog?discount=true" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
              >
                Shop Deals
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -right-6 bg-yellow-500 text-black font-bold rounded-full w-16 h-16 flex items-center justify-center transform rotate-12">
                  40%<br/> OFF
                </div>
                <img 
                  src="https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?w=300&q=80" 
                  alt="Electronics Sale" 
                  className="rounded-lg shadow-lg max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Top Rated Products</h2>
            <Link to="/catalog?sort=rating" className="text-blue-600 hover:text-blue-800 font-medium">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loading type="spinner" text="Loading products..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="block">
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Subscribe to our newsletter for the latest product updates and exclusive offers.</p>
          
          <form className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</p>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;