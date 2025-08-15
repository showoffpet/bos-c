import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from '../axios.js';
import { useAuth } from './AuthContext.js';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isLoggedIn } = useAuth();

    // Fetch cart items from database when user is logged in
    const fetchCartItems = useCallback(async () => {
        if (!isLoggedIn) {
            setCartItems([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            // Get token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.get('/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setCartItems(response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch cart items');
            }
        } catch (err) {
            console.error('Error fetching cart items:', err);
            setError(err.message);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    }, [isLoggedIn]);

    // Load cart from database on component mount and when user login status changes
    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    const addToCart = async (item) => {
        if (!isLoggedIn) {
            setError('Please log in to add items to cart');
            return false;
        }

        try {
            setLoading(true);
            setError(null);

            // Prepare item data for backend
            const cartItemData = {
                service: item.service,
                itemType: item.service === 'Merch Order' ? 'merchandise' : 'parcel',
                name: item.service === 'Merch Order' ? item.name : item.service,
                price: item.service === 'Merch Order' ? item.price : 0, // Price will be calculated on backend
                quantity: item.quantity || 1
            };

            // Add parcel-specific data if it's a parcel service
            if (item.service !== 'Merch Order') {
                cartItemData.senderInfo = {
                    name: item.senderName,
                    email: item.senderEmail,
                    phone: item.senderPhone,
                    address: item.senderAddress,
                    city: item.senderCity,
                    postalCode: item.senderPostalCode,
                    country: item.senderCountry
                };
                cartItemData.receiverInfo = {
                    name: item.receiverName,
                    email: item.receiverEmail,
                    phone: item.receiverPhone,
                    address: item.receiverAddress,
                    city: item.receiverCity,
                    postalCode: item.receiverPostalCode,
                    country: item.receiverCountry
                };
                cartItemData.parcelDetails = {
                    weight: item.parcelWeight,
                    dimensions: item.parcelDimensions,
                    description: item.parcelDescription,
                    deliveryInstructions: item.deliveryInstructions,
                    insurance: item.insurance || false,
                    fragile: item.fragile || false
                };
            } else {
                // Add merch-specific data
                cartItemData.merchDetails = {
                    category: 'merchandise',
                    size: item.size || 'standard',
                    color: item.color || 'standard'
                };
            }

            // Get token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.post('/cart', cartItemData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                // Refresh cart items from database
                await fetchCartItems();
                return true;
            } else {
                throw new Error(response.data.message || 'Failed to add item to cart');
            }
        } catch (err) {
            console.error('Error adding item to cart:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (cartItemId) => {
        if (!isLoggedIn) {
            setError('Please log in to remove items from cart');
            return false;
        }

        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.delete(`/cart/${cartItemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                // Refresh cart items from database
                await fetchCartItems();
                return true;
            } else {
                throw new Error(response.data.message || 'Failed to remove item from cart');
            }
        } catch (err) {
            console.error('Error removing item from cart:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        if (!isLoggedIn) {
            setError('Please log in to clear cart');
            return false;
        }

        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.delete('/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setCartItems([]);
                return true;
            } else {
                throw new Error(response.data.message || 'Failed to clear cart');
            }
        } catch (err) {
            console.error('Error clearing cart:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.totalPrice || 0);
        }, 0);
    };

    const getItemCount = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.quantity || 1);
        }, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount: getItemCount(),
            loading,
            error,
            addToCart,
            removeFromCart,
            clearCart,
            getCartTotal,
            fetchCartItems
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 