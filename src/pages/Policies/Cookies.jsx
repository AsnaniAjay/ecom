// src/pages/Policies/Cookies.jsx
import React from "react";

const Cookies = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-6">
          Last Updated: March 30, 2025
        </p>
        <p className="mb-6">
          This Cookies Policy explains how TechMart uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">What Are Cookies?</h2>
          <p className="mb-4">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p className="mb-4">
            Cookies set by the website owner (in this case, TechMart) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Types of Cookies We Use</h2>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Performance Cookies</h3>
            <p>
              These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Functional Cookies</h3>
            <p>
              These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Targeting Cookies</h3>
            <p>
              These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How Can You Control Cookies?</h2>
          <p className="mb-4">
            You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
          </p>
          <p className="mb-4">
            Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" className="text-blue-600 hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-blue-600 hover:underline">www.allaboutcookies.org</a>.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Our Cookie Management Tool</h2>
          <p className="mb-4">
            When you first visit our website, you will be presented with a cookie banner that allows you to accept or decline non-essential cookies. You can change your preferences at any time by clicking the "Cookie Settings" link in the footer of our website.
          </p>
          <div className="bg-gray-100 p-6 rounded-lg mt-4">
            <h3 className="font-medium mb-2">Manage Cookie Preferences</h3>
            <p className="mb-4">
              You can adjust your cookie preferences here:
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="essential" 
                  checked 
                  disabled 
                  className="mr-2"
                />
                <label htmlFor="essential">Essential Cookies (Required)</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="performance" 
                  className="mr-2"
                />
                <label htmlFor="performance">Performance Cookies</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="functional" 
                  className="mr-2"
                />
                <label htmlFor="functional">Functional Cookies</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="targeting" 
                  className="mr-2"
                />
                <label htmlFor="targeting">Targeting Cookies</label>
              </div>
            </div>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Save Preferences
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Changes to This Cookie Policy</h2>
          <p className="mb-4">
            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
          </p>
          <p className="mb-4">
            We encourage you to periodically review this Cookie Policy to stay informed about our use of cookies.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our use of cookies, please contact us at:
          </p>
          <p>Email: privacy@techmart.com</p>
          <p>Phone: 1-800-TECH-MART (1-800-832-4627)</p>
          <p>Address: 123 Tech Street, San Francisco, CA 94105</p>
        </div>
      </div>
    </div>
  );
};

export default Cookies;