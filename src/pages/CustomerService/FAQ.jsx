// src/pages/CustomerService/FAQ.jsx
import React from "react";

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-6">
          Find answers to the most common questions about our products, orders, shipping, returns, and more.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ordering</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">How do I place an order?</h3>
            <p>
              Browse our catalog, add items to your cart, and proceed to checkout. You can check out as a guest or create an account for faster checkout in the future.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Can I modify or cancel my order?</h3>
            <p>
              You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team for assistance.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Is my payment information secure?</h3>
            <p>
              Yes, we use industry-standard encryption and security protocols to protect your payment information.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping & Delivery</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">How long will it take to receive my order?</h3>
            <p>
              Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Delivery times vary based on your location.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Do you ship internationally?</h3>
            <p>
              Yes, we ship to select international destinations. International shipping rates and delivery times vary by location.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">How can I track my order?</h3>
            <p>
              You'll receive a tracking number via email once your order ships. You can also track your order by logging into your account or using the order tracking feature on our website.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Returns & Refunds</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">What is your return policy?</h3>
            <p>
              You can return most items within 30 days of delivery for a full refund. Items must be in their original condition with all packaging and accessories.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">How long does it take to process a refund?</h3>
            <p>
              Once we receive your return, it takes 1-2 business days to process. Refunds typically appear on your account within 5-7 business days, depending on your payment method.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Do I have to pay for return shipping?</h3>
            <p>
              Return shipping is free for defective items or if we made an error. For other returns, a shipping fee may apply unless you return the item to one of our physical store locations.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Product Information</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Are your products new?</h3>
            <p>
              Yes, all products sold on TechMart are brand new and authentic unless clearly marked as refurbished or open-box.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Do you offer price matching?</h3>
            <p>
              Yes, we offer price matching on identical items sold by major retailers. Contact our customer service with details for assistance.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Still Have Questions?</h2>
          <p className="mb-4">
            If you couldn't find the answer you were looking for, please contact our customer service team.
          </p>
          <a 
            href="/contact" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition inline-block"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;