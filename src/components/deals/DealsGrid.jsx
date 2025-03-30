// src/components/deals/DealsGrid.jsx
import React from 'react';
import DealCard from './DealCard';
import EmptyState from '../common/EmptyState';

const DealsGrid = ({ products, loading = false, title = "Deals" }) => {
  if (!products || products.length === 0) {
    return (
      <EmptyState 
        title="No deals available" 
        message="Check back later for new deals!"
        icon="cart" 
      />
    );
  }

  // Assign random discount percentages to each product
  const discountRanges = {
    'Audio': [30, 40],
    'Wearables': [20, 30],
    'Accessories': [40, 50],
    'Electronics': [15, 25]
  };

  const getRandomDiscount = (category) => {
    const range = discountRanges[category] || [10, 30];
    const min = range[0];
    const max = range[1];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div>
      {title && <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <DealCard
            key={product.id}
            product={product}
            discountPercentage={getRandomDiscount(product.category)}
          />
        ))}
      </div>
    </div>
  );
};

export default DealsGrid;