import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Merch.css";

const Merch = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({
    tshirt: 1,
    cap: 1,
    cup: 1
  });

  const merchItems = [
    {
      id: 'tshirt',
      name: 'T-shirts',
      price: 15,
      image: 'images/tshirt.png',
      description: 'Get your favorite BOS t-shirts delivered to your door step.',
      alt: 'BOS T-shirt'
    },
    {
      id: 'cap',
      name: 'Caps',
      price: 5,
      image: 'images/cap.png',
      description: 'Get your favorite BOS caps delivered to your door step.',
      alt: 'BOS Cap'
    },
    {
      id: 'cup',
      name: 'Cups',
      price: 10,
      image: 'images/cup.png',
      description: 'Get your favorite BOS cups delivered to your door step.',
      alt: 'BOS Cup'
    }
  ];

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities(prev => ({
        ...prev,
        [itemId]: newQuantity
      }));
    }
  };

  const handleAddToCart = async (item) => {
    const quantity = quantities[item.id];
    if (quantity > 0) {
      const cartItem = {
        ...item,
        quantity,
        service: 'Merch Order',
        addedAt: new Date().toISOString()
      };
      
      try {
        const success = await addToCart(cartItem);
        
        if (success) {
          // Show success message
          alert(`${quantity} ${item.name} added to cart successfully!`);
          
          // Reset quantity to 1
          setQuantities(prev => ({
            ...prev,
            [item.id]: 1
          }));
        } else {
          alert('Failed to add item to cart. Please try again.');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('An error occurred while adding to cart. Please try again.');
      }
    }
  };

  return (
    <div>
      <section className="services">
        <h2>Merch</h2>
        <div className="service-grid">
          {merchItems.map((item) => (
            <div key={item.id} className="service-box merch-item">
              <img src={item.image} alt={item.alt} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price-tag">${item.price}</span>
              
              <div className="quantity-selector">
                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    type="button"
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, quantities[item.id] - 1)}
                    disabled={quantities[item.id] <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    value={quantities[item.id]}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    min="1"
                    className="quantity-input"
                  />
                  <button 
                    type="button"
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, quantities[item.id] + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                className="cta-button small add-to-cart-btn"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Merch;