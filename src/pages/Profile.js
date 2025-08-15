import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from '../axios';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { cartItems, getCartTotal } = useCart();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load user data from AuthContext when component mounts
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || user.fullName || '',
        email: user.email || ''
      });
    }
  }, [user]);

  // Fetch user orders when component mounts
  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  // Fetch user orders when orders tab is active
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchUserOrders();
    }
  }, [activeTab]);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get('/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'pending';
      case 'confirmed':
        return 'confirmed';
      case 'processing':
        return 'processing';
      case 'shipped':
        return 'shipped';
      case 'delivered':
        return 'delivered';
      case 'cancelled':
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    // You could update the user object in AuthContext here as well
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    // Get the token from localStorage (generated at login)
    const token = localStorage.getItem('token');
    
    if (token) {
      // Navigate to reset password page with the stored token
      navigate(`/reset-password/${token}`);
    } else {
      // If no token, show error or redirect to login
      alert('Please log in again to change your password.');
      navigate('/login');
    }
  };

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add some items first!');
      return;
    }
    navigate('/payment');
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History ({orders.length})
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="tab-content">
            <h2>Profile</h2>
            <form id="contactForm" onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  placeholder={user?.name || user?.fullName || "Enter your full name"}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  placeholder={user?.email || "Enter your email address"}
                  required
                />
              </div>
              
              <div className="profile-actions">
                <button type="submit" className="update-profile-btn">
                  Update Profile
                </button>
                <button 
                  type="button" 
                  className="change-password-btn"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="tab-content">
            <div className="orders-header">
              <h2>Order History</h2>
              {cartItems.length > 0 && (
                <button 
                  className="confirm-order-btn"
                  onClick={handleConfirmOrder}
                >
                  Confirm Order ({cartItems.length} items - ${getCartTotal()})
                </button>
              )}
            </div>

            {loading ? (
              <div className="loading-state">
                <p>Loading orders...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <p>Error: {error}</p>
                <button onClick={fetchUserOrders} className="retry-btn">
                  Try Again
                </button>
              </div>
            ) : orders.length === 0 ? (
              <div className="empty-orders">
                <p>No orders found</p>
                <p>Your order history will appear here once you place orders.</p>
                {cartItems.length > 0 && (
                  <button 
                    className="cta-button"
                    onClick={handleConfirmOrder}
                  >
                    Place Your First Order
                  </button>
                )}
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order._id} className="order-item">
                    <div className="order-header">
                      <div className="order-info">
                        <div className="order-number">
                          <strong>Order #{order.orderNumber}</strong>
                        </div>
                        <div className="order-date">
                          Ordered: {formatDate(order.orderDate)}
                        </div>
                        <div className="order-summary">
                          {order.totalItems} items - ${order.totalPrice}
                        </div>
                      </div>
                      <div className="order-status">
                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item-detail">
                          <div className="item-service">
                            <span className="service-icon">{getServiceIcon(item.service)}</span>
                            <div>
                              <h4>{item.service === 'Merch Order' ? item.name : item.service}</h4>
                              <span className="item-details">
                                Qty: {item.quantity} - ${item.totalPrice}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 