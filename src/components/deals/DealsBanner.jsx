// src/components/deals/DealsBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DealsBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="inline-block px-3 py-1 bg-yellow-500 text-black font-bold rounded-full mb-4">
              Limited Time Offer
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Super Sale</h1>
            <p className="text-xl md:text-2xl font-light mb-2">Up to 50% off</p>
            <p className="text-lg text-blue-100 mb-6">
              Discover amazing deals on our top products. Limited stock available!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/catalog?sort=discount" 
                className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition text-center"
              >
                Shop All Deals
              </Link>
              <Link 
                to="/catalog?category=Electronics&discount=true" 
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition text-center"
              >
                Electronics Sale
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center transform transition hover:scale-105">
              <span className="text-3xl font-bold text-white mb-1">40%</span>
              <span className="text-blue-200">Off Audio</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center transform transition hover:scale-105 mt-4">
              <span className="text-3xl font-bold text-white mb-1">30%</span>
              <span className="text-blue-200">Off Wearables</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center transform transition hover:scale-105">
              <span className="text-3xl font-bold text-white mb-1">50%</span>
              <span className="text-blue-200">Off Accessories</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center transform transition hover:scale-105 mt-4">
              <span className="text-3xl font-bold text-white mb-1">20%</span>
              <span className="text-blue-200">Off Electronics</span>
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
  );
};

export default DealsBanner;