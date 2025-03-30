// src/pages/CustomerService/Returns.jsx
import React from "react";

const Returns = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Returns & Exchanges</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-6">
          We want you to be completely satisfied with your purchase. If you're not, we're here
          to help with easy returns and exchanges.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Return Policy</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Items can be returned within 30 days of delivery for a full refund.</li>
            <li>Products must be in original condition with all packaging and accessories.</li>
            <li>Defective items can be returned within 90 days for replacement or refund.</li>
            <li>Some products may have special return policies (noted on product page).</li>
            <li>Return shipping is free for defective items or our error.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How to Return an Item</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Log into your account and find the order you wish to return.</li>
            <li>Select the items you want to return and the reason for return.</li>
            <li>Print the prepaid return shipping label (if eligible).</li>
            <li>Pack the items securely in the original packaging.</li>
            <li>Drop off the package at any authorized shipping location.</li>
          </ol>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Exchanges</h2>
          <p className="mb-4">
            Want to exchange for a different color, size, or model? The fastest way is to:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Return your original item for a refund using the steps above.</li>
            <li>Place a new order for the item you want instead.</li>
          </ol>
          <p className="mt-4">
            This ensures you get the replacement item as quickly as possible.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Start a Return</h2>
          <p className="mb-4">
            To begin the return process, please enter your order number and email address.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
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
          </div>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Start Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default Returns;