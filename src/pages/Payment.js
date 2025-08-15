import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from '../axios';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if no cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to continue');
        return;
      }

      console.log('Creating order with data:', {
        notes: formData.notes,
        cartItems: cartItems,
        token: token ? 'Present' : 'Missing'
      });

      // Create order in database
      const orderResponse = await axios.post('/orders', {
        notes: formData.notes
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Order response:', orderResponse);

      if (orderResponse.data.success) {
        // Clear cart after successful order
        clearCart();
        
        // Show success message and redirect
        alert(`Order confirmed successfully! Order Number: ${orderResponse.data.data.orderNumber}`);
        navigate('/profile');
      } else {
        setError('Failed to create order. Please try again.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      
      if (err.response?.status === 400) {
        setError(err.response.data.message || 'Bad request - please check your cart');
      } else if (err.response?.status === 401) {
        setError('Authentication failed - please log in again');
      } else if (err.response?.status === 500) {
        setError('Server error - please try again later');
      } else {
        setError(err.response?.data?.message || 'Order creation failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return null; // Will redirect to cart
  }

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = getCartTotal();

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h1>Confirm Order</h1>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="summary-row">
              <span>Total Amount:</span>
              <span className="total-amount">${totalPrice}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-section">
            <h3>Additional Notes</h3>
            <div className="form-group">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special instructions or notes for your order..."
                rows="3"
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="payment-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate('/cart')}
              disabled={loading}
            >
              Back to Cart
            </button>
            <button 
              type="submit" 
              className="confirm-order-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Confirm Order - $${totalPrice}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment; 