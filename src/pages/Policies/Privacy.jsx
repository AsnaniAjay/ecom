// src/pages/Policies/Privacy.jsx
import React from "react";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-6">
          Last Updated: March 30, 2025
        </p>
        <p className="mb-6">
          At TechMart, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create an account</li>
            <li>Place an order</li>
            <li>Sign up for our newsletter</li>
            <li>Contact our customer service</li>
            <li>Participate in promotions or surveys</li>
          </ul>
          <p className="mt-4">This information may include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name</li>
            <li>Email address</li>
            <li>Mailing address</li>
            <li>Phone number</li>
            <li>Payment information</li>
            <li>Purchase history</li>
          </ul>
          <p className="mt-4">
            We also automatically collect certain information when you visit our website, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Usage data</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Create and maintain your account</li>
            <li>Provide customer support</li>
            <li>Send transactional emails and order updates</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Detect and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Sharing Your Information</h2>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Service providers who help us operate our business</li>
            <li>Payment processors to complete transactions</li>
            <li>Shipping partners to deliver your orders</li>
            <li>Marketing partners (with your consent)</li>
            <li>Legal authorities when required by law</li>
          </ul>
          <p className="mt-4">
            We do not sell your personal information to third parties.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Rights and Choices</h2>
          <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accessing your personal information</li>
            <li>Correcting inaccurate information</li>
            <li>Deleting your personal information</li>
            <li>Restricting or objecting to processing</li>
            <li>Data portability</li>
            <li>Withdrawing consent</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us using the information provided below.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>Email: privacy@techmart.com</p>
          <p>Phone: 1-800-TECH-MART (1-800-832-4627)</p>
          <p>Address: 123 Tech Street, San Francisco, CA 94105</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;