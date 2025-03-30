// src/pages/CatalogPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';
import FilterSidebar from '../components/filter/FilterSidebar';
import SortOptions from '../components/filter/SortOptions';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/ui/Pagination';
import Loading from '../components/ui/Loading';
import Button from '../components/ui/Button';
import useProducts from '../hooks/useProducts';
import  useFilters  from '../hooks/useFilters';
import  useSorting  from '../hooks/useSorting';


const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading: productsLoading } = useProducts();
  

  
  // Setup filters and sorting
  const { 
    filters, 
    filteredProducts, 
    filterMetadata, 
    updateFilter, 
    updateFilters, 
    resetFilters 
  } = useFilters(products);
  
  const { 
    sortOptions, 
    sortOption, 
    changeSortOption, 
    sortedProducts 
  } = useSorting(filteredProducts);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState('grid');
  
  // Apply URL parameters to filters
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const rating = searchParams.get('rating');
    
    // Build filter updates based on URL params
    const filterUpdates = {};
    
    if (category) {
      filterUpdates.categories = [category];
    }
    
    if (search) {
      filterUpdates.search = search;
    }
    
    if (minPrice || maxPrice) {
      filterUpdates.priceRange = {
        min: minPrice ? parseInt(minPrice) : filterMetadata.priceRange.min,
        max: maxPrice ? parseInt(maxPrice) : filterMetadata.priceRange.max
      };
    }
    
    if (rating) {
      filterUpdates.ratings = parseInt(rating);
    }
    
    // Apply filter updates if needed
    if (Object.keys(filterUpdates).length > 0) {
      updateFilters(filterUpdates);
    }
    
    // Apply sort if provided
    if (sort && sortOptions.some(option => option.id === sort)) {
      changeSortOption(sort);
    }
  }, [searchParams, filterMetadata.priceRange, updateFilters, changeSortOption, sortOptions]);
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    
    // Update URL params
    const updatedParams = new URLSearchParams(searchParams);
    
    if (newFilters.categories && newFilters.categories.length === 1) {
      updatedParams.set('category', newFilters.categories[0]);
    } else if ('categories' in newFilters) {
      updatedParams.delete('category');
    }
    
    if ('search' in newFilters) {
      if (newFilters.search) {
        updatedParams.set('search', newFilters.search);
      } else {
        updatedParams.delete('search');
      }
    }
    
    if ('priceRange' in newFilters) {
      if (newFilters.priceRange.min !== filterMetadata.priceRange.min) {
        updatedParams.set('minPrice', newFilters.priceRange.min);
      } else {
        updatedParams.delete('minPrice');
      }
      
      if (newFilters.priceRange.max !== filterMetadata.priceRange.max) {
        updatedParams.set('maxPrice', newFilters.priceRange.max);
      } else {
        updatedParams.delete('maxPrice');
      }
    }
    
    if ('ratings' in newFilters) {
      if (newFilters.ratings > 0) {
        updatedParams.set('rating', newFilters.ratings);
      } else {
        updatedParams.delete('rating');
      }
    }
    
    setSearchParams(updatedParams);
  };
  
  // Handle search
  const handleSearch = (searchQuery) => {
    updateFilter('search', searchQuery);
    setCurrentPage(1);
    
    // Update URL search param
    const updatedParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      updatedParams.set('search', searchQuery);
    } else {
      updatedParams.delete('search');
    }
    setSearchParams(updatedParams);
  };
  
  // Handle sort change
  const handleSortChange = (option) => {
    changeSortOption(option);
    
    // Update URL sort param
    const updatedParams = new URLSearchParams(searchParams);
    if (option !== 'featured') {
      updatedParams.set('sort', option);
    } else {
      updatedParams.delete('sort');
    }
    setSearchParams(updatedParams);
  };
  
  // Handle reset all filters
  const handleResetFilters = () => {
    resetFilters();
    setCurrentPage(1);
    setSearchParams({});
  };
  
  // Handle view mode toggle
  const handleViewModeToggle = (mode) => {
    setViewMode(mode);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Catalog</h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <SearchBar 
              onSearch={handleSearch} 
              initialValue={filters.search}
              placeholder="Search products by name, category or description..."
              className="w-full md:w-96"
            />
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">View:</span>
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                rounded="md"
                onClick={() => handleViewModeToggle('grid')}
                className="!px-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                rounded="md"
                onClick={() => handleViewModeToggle('list')}
                className="!px-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with filters */}
          <div className="w-full md:w-1/4">
            <FilterSidebar 
              categories={filterMetadata.categories}
              priceRange={filterMetadata.priceRange}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>
          
          {/* Main content area */}
          <div className="w-full md:w-3/4">
            {/* Results overview and sorting */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="mb-4 sm:mb-0">
                {!productsLoading && (
                  <p className="text-gray-600">
                    Showing {currentProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-
                    {Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} products
                  </p>
                )}
              </div>
              
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">Sort by:</span>
                <SortOptions value={sortOption} onChange={handleSortChange} />
              </div>
            </div>
            
            {/* Products grid or loading state */}
            {productsLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loading type="spinner" text="Loading products..." />
              </div>
            ) : sortedProducts.length === 0 ? (
              <EmptyState 
                title="No products found"
                message="Try adjusting your filters or search criteria to find what you're looking for."
                icon="search"
                action={
                  <Button variant="primary" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                }
              />
            ) : (
              <>
                {/* Product grid */}
                <ProductGrid 
                  products={currentProducts} 
                  viewType={viewMode} 
                />
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-8"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CatalogPage;