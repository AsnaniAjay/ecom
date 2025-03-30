// src/pages/MyAccountPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const MyAccountPage = ({ initialTab = 'profile' }) => {
  // State for user data (in a real app, this would come from a user context or API)
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    notifications: {
      orders: true,
      promotions: false,
      newsletter: true
    }
  });

  // Get cart and wishlist data to display summary
  const { cart, totalItems, cartTotal } = useCart();
  const { wishlist, wishlistCount } = useWishlist();

  // Active tab state
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Set the active tab when initialTab prop changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price / 100);
  };

  // Mock orders data (in a real app, this would come from an API)
  const mockOrders = [
    { 
      id: '#ORD-2025-1001', 
      date: 'Mar 25, 2025', 
      total: 12499, 
      status: 'Delivered', 
      items: 3 
    },
    { 
      id: '#ORD-2025-0892', 
      date: 'Feb 12, 2025', 
      total: 5699, 
      status: 'Processing', 
      items: 2 
    },
    { 
      id: '#ORD-2024-7541', 
      date: 'Dec 18, 2024', 
      total: 8999, 
      status: 'Delivered', 
      items: 4 
    }
  ];

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // This would save the user data in a real app
    alert('Profile updated successfully!');
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties
      const [parent, child] = name.split('.');
      setUser({
        ...user,
        [parent]: {
          ...user[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      // Handle top-level properties
      setUser({
        ...user,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* User Info */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Profile Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Order History
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('addresses')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'addresses' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Addresses
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('notifications')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Notification Settings
                    </button>
                  </li>
                  <li className="pt-4 border-t border-gray-200">
                    <Link
                      to="/wishlist"
                      className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <span>My Wishlist</span>
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                        {wishlistCount}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <span>My Cart</span>
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                        {totalItems}
                      </span>
                    </Link>
                  </li>
                  <li className="pt-4 border-t border-gray-200">
                    <button
                      className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Profile Settings Tab */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Profile Settings</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={user.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={user.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={user.phone}
                          onChange={handleInputChange}
                          placeholder="(123) 456-7890"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div className="md:col-span-2 pt-4 mt-4 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                              Current Password
                            </label>
                            <input
                              type="password"
                              id="current-password"
                              name="currentPassword"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div className="hidden md:block">
                            {/* Empty div for grid alignment */}
                          </div>
                          
                          <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <input
                              type="password"
                              id="new-password"
                              name="newPassword"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              id="confirm-password"
                              name="confirmPassword"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Order History Tab */}
              {activeTab === 'orders' && (
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Order History</h2>
                  
                  {mockOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Items
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {mockOrders.map((order) => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                {order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.items} {order.items === 1 ? 'item' : 'items'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {formatPrice(order.total)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : order.status === 'Processing'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <svg
                        className="h-12 w-12 text-gray-400 mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
                      <p className="text-gray-500 mb-4">When you place an order, it will appear here.</p>
                      <Link
                        to="/catalog"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium text-gray-900">Saved Addresses</h2>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add New Address
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          type="button"
                          className="text-gray-500 hover:text-blue-600"
                          aria-label="Edit address"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-red-600"
                          aria-label="Delete address"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Default</span>
                      </div>
                      
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">Home</p>
                        <p className="text-gray-600 mt-1">123 Main St</p>
                        <p className="text-gray-600">Apt 4B</p>
                        <p className="text-gray-600">San Francisco, CA 94103</p>
                        <p className="text-gray-600">United States</p>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          type="button"
                          className="text-gray-500 hover:text-blue-600"
                          aria-label="Edit address"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-red-600"
                          aria-label="Delete address"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <button
                          type="button"
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Set as default
                        </button>
                      </div>
                      
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">Work</p>
                        <p className="text-gray-600 mt-1">456 Market St</p>
                        <p className="text-gray-600">Suite 500</p>
                        <p className="text-gray-600">San Francisco, CA 94105</p>
                        <p className="text-gray-600">United States</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notification Settings Tab */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Notification Settings</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="orders"
                            name="notifications.orders"
                            type="checkbox"
                            checked={user.notifications.orders}
                            onChange={handleInputChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="orders" className="font-medium text-gray-700">Order Updates</label>
                          <p className="text-gray-500">Receive notifications about your order status and shipping updates.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="promotions"
                            name="notifications.promotions"
                            type="checkbox"
                            checked={user.notifications.promotions}
                            onChange={handleInputChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="promotions" className="font-medium text-gray-700">Promotions</label>
                          <p className="text-gray-500">Receive notifications about special offers, discounts, and promotions.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newsletter"
                            name="notifications.newsletter"
                            type="checkbox"
                            checked={user.notifications.newsletter}
                            onChange={handleInputChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="newsletter" className="font-medium text-gray-700">Newsletter</label>
                          <p className="text-gray-500">Receive our monthly newsletter with product updates and tech news.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
            {/* Account Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-medium text-gray-900 mb-2">My Cart</h3>
                <p className="text-3xl font-bold text-blue-600 mb-1">{totalItems}</p>
                <p className="text-sm text-gray-500 mb-4">Items in your cart</p>
                {totalItems > 0 && (
                  <p className="text-sm text-gray-700">
                    Total: <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </p>
                )}
                <div className="mt-4">
                  <Link 
                    to="/cart" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Cart →
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-medium text-gray-900 mb-2">My Wishlist</h3>
                <p className="text-3xl font-bold text-blue-600 mb-1">{wishlistCount}</p>
                <p className="text-sm text-gray-500 mb-4">Saved items</p>
                <div className="mt-4">
                  <Link 
                    to="/wishlist" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Wishlist →
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-medium text-gray-900 mb-2">My Orders</h3>
                <p className="text-3xl font-bold text-blue-600 mb-1">{mockOrders.length}</p>
                <p className="text-sm text-gray-500 mb-4">Total orders</p>
                <div className="mt-4">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Orders →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyAccountPage;