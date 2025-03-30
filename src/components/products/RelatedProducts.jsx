// src/components/products/RelatedProducts.jsx
import React, { useState, useRef } from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ products }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 300; // Adjust based on your item width
    
    if (container) {
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setScrollPosition(scrollPosition + scrollAmount);
      }
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = containerRef.current ? 
    containerRef.current.scrollWidth > containerRef.current.clientWidth + scrollPosition : 
    true;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      
      {/* Products Container */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 py-4 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map(product => (
          <div key={product.id} className="flex-shrink-0 w-64">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {/* Scroll Right Button */}
      {canScrollRight && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      
      {/* Add a CSS rule to hide scrollbars */}
      <style jsx="true">{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RelatedProducts;