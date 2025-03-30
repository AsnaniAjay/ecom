// src/pages/CustomerService/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <p className="mb-6">
          Have questions, concerns, or feedback? We're here to help. Please use one of the
          methods below to reach our customer service team.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Customer Support</h2>
          <p className="mb-2">
            <strong>Email:</strong> support@techmart.com
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> 1-800-TECH-MART (1-800-832-4627)
          </p>
          <p className="mb-2">
            <strong>Hours:</strong> Monday-Friday, 9AM-6PM EST
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block mb-1 font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Subject"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-1 font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;