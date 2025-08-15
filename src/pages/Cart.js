import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal, loading, error, fetchCartItems } = useCart();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getServiceIcon = (service) => {
    switch (service) {
      case 'Same-Day Delivery':
        return '🚀';
      case 'Next-Day Delivery':
        return '📦';
      case 'Bulk/Business Logistics':
        return '🏢';
      case 'International Shipping':
        return '🌍';
      case 'Merch Order':
        return '🛍️';
      default:
        return '📋';
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    const success = await removeFromCart(cartItemId);
    if (success) {
      // Item was removed successfully
      console.log('Item removed from cart');
    }
  };

  const handleClearCart = async () => {
    const success = await clearCart();
    if (success) {
      // Cart was cleared successfully
      console.log('Cart cleared');
    }
  };

  const handleRefreshCart = () => {
    fetchCartItems();
  };

  if (loading && cartItems.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="cart-page-box">
          <h1>Your Cart</h1>
          <div className="loading-state">
            <p>Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && cartItems.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="cart-page-box">
          <h1>Your Cart</h1>
          <div className="error-state">
            <p>Error: {error}</p>
            <button onClick={handleRefreshCart} className="cta-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="cart-page-box">
          <h1>Your Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <p>Add some items to get started!</p>
            <Link to="/services" className="cta-button">
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-page-box">
        <div className="cart-header">
          <h1>Your Cart</h1>
          <p>You have {cartItems.length} item(s) in your cart</p>
          {loading && <p className="loading-indicator">Updating...</p>}
          {error && <p className="error-indicator">Error: {error}</p>}
        </div>

        <div className="cart-table-container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Service/Item</th>
                <th>Details</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="cart-item-row">
                  <td className="service-cell">
                    <div className="service-info">
                      <span className="service-icon">{getServiceIcon(item.service)}</span>
                      <div>
                        <h4>{item.service === 'Merch Order' ? item.name : item.service}</h4>
                        <span className="service-date">Added: {formatDate(item.addedAt)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="details-cell">
                    {item.service === 'Merch Order' ? (
                      <div className="item-details">
                        <div className="detail-row">
                          <span className="label">Type:</span>
                          <span>{item.name}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Unit Price:</span>
                          <span>${item.price}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Category:</span>
                          <span>Merchandise</span>
                        </div>
                      </div>
                    ) : (
                      <div className="item-details">
                        <div className="detail-row">
                          <span className="label">From:</span>
                          <span>{item.senderInfo?.name || 'N/A'} - {item.senderInfo?.city || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">To:</span>
                          <span>{item.receiverInfo?.name || 'N/A'} - {item.receiverInfo?.city || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Weight:</span>
                          <span>{item.parcelDetails?.weight || 'N/A'} kg</span>
                        </div>
                        <div className="badges">
                          {item.parcelDetails?.insurance && (
                            <span className="insurance-badge">Insurance</span>
                          )}
                          {item.parcelDetails?.fragile && (
                            <span className="fragile-badge">Fragile</span>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="quantity-cell">
                    <span className="quantity">{item.quantity || 1}</span>
                  </td>
                  <td className="price-cell">
                    <span className="price">${item.totalPrice || 0}</span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item._id)}
                      title="Remove item"
                      disabled={loading}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Number of Items:</span>
            <span className="summary-value">{cartItems.length}</span>
          </div>
          <div className="summary-row">
            <span>Total Price:</span>
            <span className="summary-value total-price">${getCartTotal()}</span>
          </div>
        </div>

        <div className="cart-actions">
          <button 
            className="clear-cart-btn" 
            onClick={handleClearCart}
            disabled={loading}
          >
            {loading ? 'Clearing...' : 'Clear Cart'}
          </button>
          <button 
            className="checkout-btn" 
            disabled={loading}
            onClick={() => navigate('/payment')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 