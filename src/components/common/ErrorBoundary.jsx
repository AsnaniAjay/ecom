// src/components/common/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  // Catch errors in any child components
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  // Log error information
  componentDidCatch(error, errorInfo) {
    // Log error to console
    console.error('ErrorBoundary caught an error', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // You can also log the error to an error reporting service like Sentry
    // logErrorToService(error, errorInfo);
  }

  // Reset error state
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    // If there was an error, show the fallback UI
    if (this.state.hasError) {
      // Check if a custom fallback UI was provided
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          errorInfo: this.state.errorInfo,
          reset: this.handleReset
        });
      }
      
      // Default error UI
      return (
        <div className="p-6 mx-auto my-8 max-w-lg bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center text-center">
            <svg
              className="w-16 h-16 text-red-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              We're sorry, but there was an error loading this page.
            </p>
            <button
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={this.handleReset}
            >
              Try again
            </button>
            
            {/* Show technical details in development environment */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md text-left overflow-auto w-full">
                <p className="text-red-600 font-bold mb-2">Error:</p>
                <p className="text-gray-800 mb-4">{this.state.error && this.state.error.toString()}</p>
                <p className="text-red-600 font-bold mb-2">Component Stack:</p>
                <pre className="text-gray-800 text-sm whitespace-pre-wrap">
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    // Otherwise, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;