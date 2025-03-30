// src/pages/CustomerService/Warranty.jsx
import React from "react";

const Warranty = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Warranty Information</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-6">
          TechMart stands behind the quality of our products. Learn more about our warranty coverage and how to get support for your purchases.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Standard Warranty Coverage</h2>
          <p className="mb-4">
            Most products sold on TechMart come with the manufacturer's standard warranty. Warranty periods vary by product category:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Smartphones & Tablets:</strong> 1 year manufacturer warranty</li>
            <li><strong>Laptops & Computers:</strong> 1 year manufacturer warranty</li>
            <li><strong>TVs & Monitors:</strong> 1-2 years manufacturer warranty</li>
            <li><strong>Audio Equipment:</strong> 1 year manufacturer warranty</li>
            <li><strong>Accessories:</strong> 90 days manufacturer warranty</li>
            <li><strong>Refurbished Items:</strong> 90 days TechMart warranty</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Extended Warranty Options</h2>
          <p className="mb-4">
            For additional peace of mind, TechMart offers extended warranty plans for most products:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>TechCare Basic:</strong> Extends manufacturer warranty by 1 additional year</li>
            <li><strong>TechCare Plus:</strong> Extends manufacturer warranty by 2 additional years</li>
            <li><strong>TechCare Premium:</strong> Extends manufacturer warranty by 2 years and includes accidental damage protection</li>
          </ul>
          <p className="mt-4">
            Extended warranty plans must be purchased at the time of product purchase.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Making a Warranty Claim</h2>
          <p className="mb-4">
            If your product is defective or malfunctioning within the warranty period, follow these steps:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Locate your order number and proof of purchase.</li>
            <li>Contact our customer service team via phone, email, or the contact form.</li>
            <li>Provide details about the issue you're experiencing with the product.</li>
            <li>Our team will guide you through the warranty claim process, which may involve:</li>
            <ul className="list-disc pl-6 mt-2 mb-2">
              <li>Troubleshooting steps to resolve the issue</li>
              <li>Returning the product for repair</li>
              <li>Product replacement</li>
              <li>Refund (in some cases)</li>
            </ul>
          </ol>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">What's Not Covered</h2>
          <p className="mb-4">
            Warranty coverage typically does not include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accidental damage (unless covered by TechCare Premium)</li>
            <li>Normal wear and tear</li>
            <li>Water damage</li>
            <li>Damage due to misuse or abuse</li>
            <li>Unauthorized repairs or modifications</li>
            <li>Consumable parts (batteries, filters, etc. after the initial defect period)</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Check Warranty Status</h2>
          <p className="mb-4">
            To check the warranty status of your product, please enter your order number and the product's serial number.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Order Number"
              className="px-4 py-2 border rounded-md flex-1"
            />
            <input
              type="text"
              placeholder="Serial Number"
              className="px-4 py-2 border rounded-md flex-1"
            />
          </div>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Check Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warranty;