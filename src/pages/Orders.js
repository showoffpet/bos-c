import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Orders = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  const [selectedService, setSelectedService] = useState('Parcel Sending');
  
  // Form state
  const [formData, setFormData] = useState({
    // Sender Information
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    senderAddress: '',
    senderCity: '',
    senderPostalCode: '',
    senderCountry: '',
    
    // Receiver Information
    receiverName: '',
    receiverEmail: '',
    receiverPhone: '',
    receiverAddress: '',
    receiverCity: '',
    receiverPostalCode: '',
    receiverCountry: '',
    
    // Parcel Information
    parcelWeight: '',
    parcelDimensions: '',
    parcelDescription: '',
    deliveryInstructions: '',
    insurance: false,
    fragile: false
  });

  useEffect(() => {
    // Get service from URL params or location state
    const params = new URLSearchParams(location.search);
    const service = params.get('service') || location.state?.service || 'Parcel Sending';
    setSelectedService(service);
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create parcel order object with service information
    const parcelOrder = {
      ...formData,
      service: selectedService
    };
    
    try {
      // Add to cart
      const success = await addToCart(parcelOrder);
      
      if (success) {
        // Show success message
        alert(`Parcel order added to cart successfully! Service: ${selectedService}`);
        
        // Reset form
        setFormData({
          senderName: '',
          senderEmail: '',
          senderPhone: '',
          senderAddress: '',
          senderCity: '',
          senderPostalCode: '',
          senderCountry: '',
          receiverName: '',
          receiverEmail: '',
          receiverPhone: '',
          receiverAddress: '',
          receiverCity: '',
          receiverPostalCode: '',
          receiverCountry: '',
          parcelWeight: '',
          parcelDimensions: '',
          parcelDescription: '',
          deliveryInstructions: '',
          insurance: false,
          fragile: false
        });
      } else {
        alert('Failed to add parcel order to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding to cart. Please try again.');
    }
  };

  return (
    <div className="parcel-container">
      <div className="parcel-box">
        <h1>{selectedService}</h1>
        <p className="subtitle">Fill in the details below to send your parcel</p>
        
        <form onSubmit={handleSubmit} className="parcel-form">
          {/* Sender Information Section */}
          <div className="form-section">
            <h3>Sender Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="senderName">Full Name</label>
                <input
                  type="text"
                  id="senderName"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="senderEmail">Email</label>
                <input
                  type="email"
                  id="senderEmail"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="senderPhone">Phone</label>
                <input
                  type="tel"
                  id="senderPhone"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="senderCountry">Country</label>
                <input
                  type="text"
                  id="senderCountry"
                  name="senderCountry"
                  value={formData.senderCountry}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="senderAddress">Street Address</label>
              <input
                type="text"
                id="senderAddress"
                name="senderAddress"
                value={formData.senderAddress}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="senderCity">City</label>
                <input
                  type="text"
                  id="senderCity"
                  name="senderCity"
                  value={formData.senderCity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="senderPostalCode">Postal Code</label>
                <input
                  type="text"
                  id="senderPostalCode"
                  name="senderPostalCode"
                  value={formData.senderPostalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Receiver Information Section */}
          <div className="form-section">
            <h3>Receiver Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="receiverName">Full Name</label>
                <input
                  type="text"
                  id="receiverName"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="receiverEmail">Email</label>
                <input
                  type="email"
                  id="receiverEmail"
                  name="receiverEmail"
                  value={formData.receiverEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="receiverPhone">Phone</label>
                <input
                  type="tel"
                  id="receiverPhone"
                  name="receiverPhone"
                  value={formData.receiverPhone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="receiverCountry">Country</label>
                <input
                  type="text"
                  id="receiverCountry"
                  name="receiverCountry"
                  value={formData.receiverCountry}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="receiverAddress">Street Address</label>
              <input
                type="text"
                id="receiverAddress"
                name="receiverAddress"
                value={formData.receiverAddress}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="receiverCity">City</label>
                <input
                  type="text"
                  id="receiverCity"
                  name="receiverCity"
                  value={formData.receiverCity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="receiverPostalCode">Postal Code</label>
                <input
                  type="text"
                  id="receiverPostalCode"
                  name="receiverPostalCode"
                  value={formData.receiverPostalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Parcel Information Section */}
          <div className="form-section">
            <h3>Parcel Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="parcelWeight">Weight (kg)</label>
                <input
                  type="number"
                  id="parcelWeight"
                  name="parcelWeight"
                  value={formData.parcelWeight}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0.1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="parcelDimensions">Dimensions (L x W x H cm)</label>
                <input
                  type="text"
                  id="parcelDimensions"
                  name="parcelDimensions"
                  value={formData.parcelDimensions}
                  onChange={handleInputChange}
                  placeholder="e.g., 30 x 20 x 15"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="parcelDescription">Parcel Description</label>
              <textarea
                id="parcelDescription"
                name="parcelDescription"
                value={formData.parcelDescription}
                onChange={handleInputChange}
                rows="3"
                placeholder="Describe what's inside the parcel"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="deliveryInstructions">Delivery Instructions</label>
              <textarea
                id="deliveryInstructions"
                name="deliveryInstructions"
                value={formData.deliveryInstructions}
                onChange={handleInputChange}
                rows="2"
                placeholder="Any special delivery instructions"
              />
            </div>
            
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="insurance"
                  checked={formData.insurance}
                  onChange={handleInputChange}
                />
                <span>Add Insurance</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="fragile"
                  checked={formData.fragile}
                  onChange={handleInputChange}
                />
                <span>Fragile Item</span>
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Add to Cart
          </button>
        </form>
    </div>
    </div>
  );
};

export default Orders;