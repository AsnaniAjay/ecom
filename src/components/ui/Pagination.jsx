// src/components/ui/Pagination.jsx
import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = ''
}) => {
  // If there's only one page, don't render pagination
  if (totalPages <= 1) return null;
  
  // Generate page range
  const getPageRange = () => {
    // Always show first and last page
    const firstPage = 1;
    const lastPage = totalPages;
    
    // Calculate range around current page
    let startPage = Math.max(firstPage, currentPage - siblingCount);
    let endPage = Math.min(lastPage, currentPage + siblingCount);
    
    // Adjust the range to always show the same number of pages
    const totalPageNumbers = siblingCount * 2 + 1;
    
    if (endPage - startPage + 1 < totalPageNumbers) {
      if (startPage === firstPage) {
        endPage = Math.min(lastPage, firstPage + totalPageNumbers - 1);
      } else if (endPage === lastPage) {
        startPage = Math.max(firstPage, lastPage - totalPageNumbers + 1);
      }
    }
    
    const range = [];
    
    // Add left ellipsis if needed
    if (startPage > firstPage + 1) {
      range.push({ type: 'ellipsis', page: -1, label: '...' });
    } else if (startPage === firstPage + 1) {
      range.push({ type: 'page', page: firstPage + 1, label: String(firstPage + 1) });
    }
    
    // Add pages in the middle
    for (let i = startPage; i <= endPage; i++) {
      if (i !== firstPage && i !== lastPage) {
        range.push({ type: 'page', page: i, label: String(i) });
      }
    }
    
    // Add right ellipsis if needed
    if (endPage < lastPage - 1) {
      range.push({ type: 'ellipsis', page: -2, label: '...' });
    } else if (endPage === lastPage - 1) {
      range.push({ type: 'page', page: lastPage - 1, label: String(lastPage - 1) });
    }
    
    // Always add first and last page at the extremes
    return [
      { type: 'page', page: firstPage, label: String(firstPage) },
      ...range,
      { type: 'page', page: lastPage, label: String(lastPage) }
    ];
  };
  
  const pageRange = getPageRange();
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    onPageChange(page);
  };
  
  return (
    <nav className={`flex justify-center mt-8 ${className}`} aria-label="Pagination">
      <ul className="inline-flex items-center -space-x-px">
        {/* Previous Button */}
        <li>
          <button
            className={`
              px-3 py-2 ml-0 leading-tight border rounded-l-lg
              ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed bg-gray-100' : 'text-gray-700 hover:bg-gray-100 bg-white'}
              border-gray-300
            `}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <span className="sr-only">Previous</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
        </li>
        
        {/* Page Numbers */}
        {pageRange.map((pageItem, index) => (
          <li key={index}>
            {pageItem.type === 'ellipsis' ? (
              <span className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300">
                {pageItem.label}
              </span>
            ) : (
              <button
                className={`
                  px-3 py-2 leading-tight border
                  ${pageItem.page === currentPage
                    ? 'text-white bg-blue-600 border-blue-600 hover:bg-blue-700 z-10'
                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100'
                  }
                `}
                onClick={() => handlePageChange(pageItem.page)}
                aria-current={pageItem.page === currentPage ? 'page' : undefined}
              >
                {pageItem.label}
              </button>
            )}
          </li>
        ))}
        
        {/* Next Button */}
        <li>
          <button
            className={`
              px-3 py-2 leading-tight border rounded-r-lg
              ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed bg-gray-100' : 'text-gray-700 hover:bg-gray-100 bg-white'}
              border-gray-300
            `}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <span className="sr-only">Next</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;