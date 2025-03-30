// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductDetail from '../components/products/ProductDetail';
import RelatedProducts from '../components/products/RelatedProducts';
import Loading from '../components/ui/Loading';
import Button from '../components/ui/Button';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/ui/Modal';
import useProducts from '../hooks/useProducts';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, loading, error, fetchProductById, selectedProduct, getRelatedProducts } = useProducts();
  const { addToCart, isInCart } = useCart();
  
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAddedModal, setShowAddedModal] = useState(false);
  
  // Fetch product details when productId changes
  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
      window.scrollTo(0, 0);
    }
  }, [productId, fetchProductById]);
  
  // Set related products when selectedProduct changes
  useEffect(() => {
    if (selectedProduct && products.length > 0) {
      const related = getRelatedProducts(selectedProduct, 8);
      setRelatedProducts(related);
    }
  }, [selectedProduct, products, getRelatedProducts]);
  
  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= (selectedProduct?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
      setShowAddedModal(true);
    }
  };
  
  // Close modal and navigate options
  const handleCloseModal = () => {
    setShowAddedModal(false);
  };
  
  const handleContinueShopping = () => {
    setShowAddedModal(false);
  };
  
  const handleGoToCart = () => {
    setShowAddedModal(false);
    navigate('/cart');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <nav className="flex mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <Link to="/catalog" className="text-gray-500 hover:text-blue-600">Products</Link>
            </li>
            {selectedProduct && (
              <li className="flex items-center space-x-2">
                <span className="text-gray-500">/</span>
                <Link 
                  to={`/catalog?category=${selectedProduct.category}`} 
                  className="text-gray-500 hover:text-blue-600"
                >
                  {selectedProduct.category}
                </Link>
              </li>
            )}
            {selectedProduct && (
              <li className="flex items-center space-x-2">
                <span className="text-gray-500">/</span>
                <span className="text-gray-700 font-medium truncate max-w-xs">
                  {selectedProduct.name}
                </span>
              </li>
            )}
          </ol>
        </nav>
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loading type="spinner" text="Loading product details..." />
          </div>
        )}
        
        {/* Error state */}
        {!loading && error && (
          <EmptyState
            title="Product not found"
            message="The product you're looking for doesn't exist or has been removed."
            icon="error"
            action={
              <Button variant="primary" onClick={() => navigate('/catalog')}>
                Back to Catalog
              </Button>
            }
          />
        )}
        
        {/* Product details */}
        {!loading && !error && selectedProduct && (
          <>
            <ProductDetail 
              product={selectedProduct}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              inCart={isInCart(selectedProduct.id)}
            />
            
            {/* Related products */}
            {relatedProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
                <RelatedProducts products={relatedProducts} />
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Added to cart modal */}
      <Modal
        isOpen={showAddedModal}
        onClose={handleCloseModal}
        title="Added to Cart"
        size="md"
        footer={
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-end">
            <Button 
              variant="outline" 
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
            <Button 
              variant="primary" 
              onClick={handleGoToCart}
            >
              View Cart
            </Button>
          </div>
        }
      >
        <div className="flex items-center gap-4">
          {selectedProduct && (
            <>
              <div className="w-16 h-16 flex-shrink-0">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedProduct.name}</p>
                <p className="text-gray-500">
                  {quantity} {quantity === 1 ? 'item' : 'items'} added to your cart
                </p>
                <p className="font-bold text-blue-600 mt-1">
                  ${((selectedProduct.price * quantity) / 100).toFixed(2)}
                </p>
              </div>
            </>
          )}
        </div>
      </Modal>
    </Layout>
  );
};

export default ProductDetailPage;