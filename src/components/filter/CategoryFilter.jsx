// src/components/filter/CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ categories, selectedCategories, onChange }) => {
  const handleCategoryChange = (category) => {
    let newSelectedCategories = [...selectedCategories];
    
    if (newSelectedCategories.includes(category)) {
      // If already selected, remove it
      newSelectedCategories = newSelectedCategories.filter(cat => cat !== category);
    } else {
      // If not selected, add it
      newSelectedCategories.push(category);
    }
    
    onChange(newSelectedCategories);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <input
              id={`category-${category}`}
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor={`category-${category}`}
              className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;