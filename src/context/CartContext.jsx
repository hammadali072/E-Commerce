import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

const VALID_COUPONS = {
    'SAVE10': 10,
    'SAVE20': 20,
    'ESHOP15': 15,
    'WELCOME5': 5
};

const initialState = {
    items: []
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_CART':
            return {
                ...state,
                items: action.payload
            };

        case 'ADD_TO_CART': {
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex > -1) {
                const updatedItems = [...state.items];
                const currentQty = updatedItems[existingItemIndex].quantity;
                const stock = action.payload.stock !== undefined ? action.payload.stock : 20;
                
                if (currentQty < stock) {
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: currentQty + 1
                    };
                }
                return { ...state, items: updatedItems };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1, selectedSize: '', selectedColor: '' }]
            };
        }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };

        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.id === id);
            if (!itemToUpdate) return state;

            const stock = itemToUpdate.stock !== undefined ? itemToUpdate.stock : 20;
            const clampedQty = Math.max(0, Math.min(quantity, stock));

            if (clampedQty === 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== id)
                };
            }

            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id ? { ...item, quantity: clampedQty } : item
                )
            };
        }

        case 'UPDATE_ITEM_OPTIONS': {
            const { id, selectedSize, selectedColor } = action.payload;
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id ? { ...item, selectedSize, selectedColor } : item
                )
            };
        }

        case 'CLEAR_CART':
            return {
                ...state,
                items: []
            };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscount, setCouponDiscount] = useState(0);

    // Load from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('eshop-cart');
        if (savedCart) {
            dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('eshop-cart', JSON.stringify(state.items));
    }, [state.items]);

    const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
    const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    const updateItemOptions = (id, options) => dispatch({ type: 'UPDATE_ITEM_OPTIONS', payload: { id, ...options } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const isInCart = (id) => state.items.some(item => item.id === id);
    const getItemCount = () => state.items.reduce((total, item) => total + item.quantity, 0);
    const getSubtotal = () => state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const getDiscount = () => state.items.reduce((total, item) => {
        if (item.oldPrice) {
            return total + ((item.oldPrice - item.price) * item.quantity);
        }
        return total;
    }, 0);
    const getTotal = () => Math.max(0, getSubtotal() - couponDiscount);

    const applyCoupon = (code) => {
        const normalizedCode = code.trim().toUpperCase();
        if (VALID_COUPONS[normalizedCode]) {
            const discount = VALID_COUPONS[normalizedCode];
            setCouponCode(normalizedCode);
            setCouponDiscount(discount);
            return { success: true, discount };
        }
        return { error: 'Invalid coupon code' };
    };

    const removeCoupon = () => {
        setCouponCode('');
        setCouponDiscount(0);
    };

    return (
        <CartContext.Provider value={{
            items: state.items,
            addToCart,
            removeFromCart,
            updateQuantity,
            updateItemOptions,
            clearCart,
            isInCart,
            getItemCount,
            getSubtotal,
            getDiscount,
            getTotal,
            couponCode,
            couponDiscount,
            applyCoupon,
            removeCoupon
        }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
