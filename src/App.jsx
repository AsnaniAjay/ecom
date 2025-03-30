// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { FilterProvider } from "./context/FilterContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import DealsPage from "./pages/DealsPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import MyAccountPage from "./pages/MyAccountPage";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Import Customer Service Pages
import Contact from "./pages/CustomerService/Contact";
import Shipping from "./pages/CustomerService/Shipping";
import Returns from "./pages/CustomerService/Returns";
import FAQ from "./pages/CustomerService/FAQ";
import Warranty from "./pages/CustomerService/Warranty";

// Import Policy Pages
import Privacy from "./pages/Policies/Privacy";
import Terms from "./pages/Policies/Terms";
import Cookies from "./pages/Policies/Cookies";

// Import CSS
import "./index.css";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ProductProvider>
          <FilterProvider>
            <CartProvider>
              <WishlistProvider>
                <Routes>
                  {/* Home Page */}
                  <Route path="/" element={<HomePage />} />

                  {/* Product Catalog */}
                  <Route path="/catalog" element={<CatalogPage />} />

                  {/* Product Detail */}
                  <Route
                    path="/product/:productId"
                    element={<ProductDetailPage />}
                  />

                  {/* Category Pages */}
                  <Route path="/categories" element={<CatalogPage />} />
                  <Route
                    path="/categories/:category"
                    element={<CatalogPage />}
                  />

                  {/* Deals Page */}
                  <Route path="/deals" element={<DealsPage />} />
                  <Route path="/deals/:category" element={<DealsPage />} />

                  {/* Cart Page */}
                  <Route path="/cart" element={<CartPage />} />

                  {/* Wishlist Page */}
                  <Route path="/wishlist" element={<WishlistPage />} />

                  {/* Account Pages */}
                  <Route path="/account" element={<MyAccountPage />} />
                  <Route
                    path="/account/orders"
                    element={<MyAccountPage initialTab="orders" />}
                  />

                  {/* Information Pages */}
                  <Route
                    path="/about"
                    element={
                      <div className="text-center py-16">
                        <h1 className="text-2xl font-bold">About Us</h1>
                        <p className="text-gray-600 mt-4">
                          Learn more about our company and mission.
                        </p>
                      </div>
                    }
                  />

                  {/* Customer Service Pages */}
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/warranty" element={<Warranty />} />

                  {/* Policy Pages */}
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<Cookies />} />

                  {/* 404 Not Found */}
                  <Route
                    path="*"
                    element={
                      <div className="text-center py-16">
                        <h1 className="text-2xl font-bold">
                          404 - Page Not Found
                        </h1>
                        <p className="text-gray-600 mt-4">
                          The page you're looking for doesn't exist or has been
                          moved.
                        </p>
                      </div>
                    }
                  />
                </Routes>
              </WishlistProvider>
            </CartProvider>
          </FilterProvider>
        </ProductProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
