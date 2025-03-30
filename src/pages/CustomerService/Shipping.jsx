// src/pages/CustomerService/Shipping.jsx
import React from "react";

const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-6">
          At TechMart, we strive to provide fast and reliable shipping for all your tech purchases.
          Below is information about our shipping policies and delivery options.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Options</h2>
          <div className="border-b pb-4 mb-4">
            <h3 className="font-medium mb-2">Standard Shipping</h3>
            <p>Delivery in 3-5 business days</p>
            <p>Free on orders over $50</p>
            <p>$4.99 for orders under $50</p>
          </div>

          <div className="border-b pb-4 mb-4">
            <h3 className="font-medium mb-2">Express Shipping</h3>
            <p>Delivery in 1-2 business days</p>
            <p>$9.99 on all orders</p>
          </div>

          <div className="pb-4 mb-4">
            <h3 className="font-medium mb-2">Next Day Delivery</h3>
            <p>Order by 2pm for delivery next business day</p>
            <p>$19.99 on all orders</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Policies</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We ship to all 50 U.S. states and select international destinations.</li>
            <li>Order processing typically takes 1 business day.</li>
            <li>Shipping times do not include weekends or holidays.</li>
            <li>All orders come with tracking information sent via email.</li>
            <li>International orders may be subject to customs fees and import taxes.</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Track Your Order</h2>
          <p className="mb-4">
            To check the status of your order, please enter your order number and email address.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Order Number"
              className="px-4 py-2 border rounded-md flex-1"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-2 border rounded-md flex-1"
            />
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Track
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;