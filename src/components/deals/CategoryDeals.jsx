// src/components/deals/CategoryDeals.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import DealCard from './DealCard';

const CategoryDeals = ({ category, products, maxItems = 4 }) => {
  if (!products || products.length === 0) {
    return null;
  }

  // Get the discount percentage based on category
  const getDiscountPercentage = (category) => {
    switch (category) {
      case 'Audio':
        return 40;
      case 'Wearables':
        return 30;
      case 'Accessories':
        return 50;
      case 'Electronics':
        return 20;
      default:
        return 25;
    }
  };

  // Get items to display, limiting to maxItems
  const displayProducts = products.slice(0, maxItems);
  const discount = getDiscountPercentage(category);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{category} Deals</h2>
          <p className="text-gray-600 text-sm mt-1">Up to {discount}% off {category}</p>
        </div>
        <Link 
          to={`/catalog?category=${category}&discount=true`} 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View All →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map(product => (
          <DealCard 
            key={product.id} 
            product={product} 
            discountPercentage={discount}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryDeals;