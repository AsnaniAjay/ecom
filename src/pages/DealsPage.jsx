// src/pages/DealsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/products/ProductCard';
import DealsBanner from '../components/deals/DealsBanner';
import DealTimer from '../components/deals/DealTimer';
import Loading from '../components/ui/Loading';
import useProducts  from '../hooks/useProducts';

const DealsPage = () => {
  const { products, loading } = useProducts();
  const [dealProducts, setDealProducts] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  const [categoryDeals, setCategoryDeals] = useState({});
  
  // Deal end time (24 hours from now)
  const dealEndTime = new Date();
  dealEndTime.setHours(dealEndTime.getHours() + 24);

  useEffect(() => {
    if (products.length > 0) {
      // In a real app, you would fetch actual deals from the backend
      // For this demo, we'll simulate deals by taking products with specific attributes
      
      // Flash deals - top 4 products (simulating a special promotion)
      const topProducts = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
      setFlashDeals(topProducts);
      
      // All deals - products with a rating over 4.0 (simulating discounted products)
      const allDeals = products.filter(product => product.rating >= 4.0);
      setDealProducts(allDeals);
      
      // Deals by category
      const dealsByCategory = allDeals.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      }, {});
      
      setCategoryDeals(dealsByCategory);
    }
  }, [products]);

  return (
    <Layout>
      {/* Hero Banner */}
      <DealsBanner />
      
      {/* Flash Deals Section */}
      <section className="py-10 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Flash Deals</h2>
              <p className="text-gray-600 mt-1">Special offers for a limited time only</p>
            </div>
            
            <div className="mt-3 md:mt-0">
              <DealTimer endTime={dealEndTime} />
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <Loading type="spinner" text="Loading deals..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {flashDeals.map(product => (
                <div key={product.id} className="relative">
                  <div className="absolute top-0 right-0 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    SALE
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Deal Categories */}
      {!loading && Object.keys(categoryDeals).length > 0 && (
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Shop Deals by Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(categoryDeals).map(category => (
                <Link 
                  key={category}
                  to={`/catalog?category=${category}&discount=true`} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
                      {getCategoryIcon(category)}
                    </div>
                    <h3 className="text-lg font-medium mb-1">{category}</h3>
                    <p className="text-blue-600 font-medium">Up to 40% off</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* All Deals */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Deals</h2>
            <Link to="/catalog?discount=true" className="text-blue-600 hover:text-blue-800 font-medium">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <Loading type="spinner" text="Loading deals..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dealProducts.slice(0, 8).map(product => (
                <div key={product.id} className="relative">
                  <div className="absolute top-0 right-0 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {Math.floor(Math.random() * 30) + 10}% OFF
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          
          {!loading && dealProducts.length > 8 && (
            <div className="text-center mt-8">
              <Link 
                to="/catalog?discount=true" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                See More Deals
              </Link>
            </div>
          )}
        </div>
      </section>
      
    {/* Newsletter Section */}
    <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Get Exclusive Deals</h2>
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

// Helper function to display different icons based on category
const getCategoryIcon = (category) => {
  switch (category) {
    case 'Electronics':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'Audio':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 017.072 0m-9.9-2.828a9 9 0 0112.728 0" />
        </svg>
      );
    case 'Accessories':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      );
    case 'Wearables':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      );
  }
};

export default DealsPage;