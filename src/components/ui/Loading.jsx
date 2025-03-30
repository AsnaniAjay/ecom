// src/components/ui/Loading.jsx
import React from 'react';

const Loading = ({
  type = 'spinner',
  size = 'md',
  color = 'blue',
  fullPage = false,
  text = '',
  className = ''
}) => {
  // Size values
  const sizes = {
    sm: {
      spinner: 'h-4 w-4',
      dots: 'h-1.5 w-1.5',
      bar: 'h-1'
    },
    md: {
      spinner: 'h-8 w-8',
      dots: 'h-2.5 w-2.5',
      bar: 'h-1.5'
    },
    lg: {
      spinner: 'h-12 w-12',
      dots: 'h-3 w-3',
      bar: 'h-2'
    }
  };
  
  // Color values
  const colors = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    indigo: 'text-indigo-600',
    purple: 'text-purple-600'
  };
  
  // Spinner component
  const Spinner = () => (
    <svg 
      className={`animate-spin ${sizes[size].spinner} ${colors[color]}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      ></circle>
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
  
  // Dots component
  const Dots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((dot) => (
        <div
          key={dot}
          className={`${sizes[size].dots} rounded-full ${colors[color]} opacity-0 animate-pulse`}
          style={{ 
            animationDelay: `${dot * 0.15}s`,
            animationDuration: '1.2s',
            animationIterationCount: 'infinite'
          }}
        ></div>
      ))}
    </div>
  );
  
  // Progress bar component
  const Bar = () => (
    <div className={`w-full ${sizes[size].bar} rounded-full bg-gray-200 overflow-hidden`}>
      <div 
        className={`${sizes[size].bar} animate-progress ${colors[color].replace('text', 'bg')}`}
        style={{
          width: '100%',
          animationDuration: '1.2s',
          animationIterationCount: 'infinite'
        }}
      ></div>
    </div>
  );
  
  // Render the loader
  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return <Dots />;
      case 'bar':
        return <Bar />;
      case 'spinner':
      default:
        return <Spinner />;
    }
  };
  
  // If fullPage, render with overlay
  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          {renderLoader()}
          {text && <p className="mt-4 text-gray-700">{text}</p>}
        </div>
      </div>
    );
  }
  
  // Normal loader with optional text
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {renderLoader()}
      {text && <p className="mt-2 text-gray-700 text-sm">{text}</p>}
    </div>
  );
};

export default Loading;