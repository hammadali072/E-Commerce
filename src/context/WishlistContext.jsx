import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

const WishlistContext = createContext();

const initialState = {
    items: JSON.parse(localStorage.getItem('eshop-wishlist')) || []
};

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            if (state.items.find(item => item.id === action.payload.id)) {
                return state;
            }
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case 'CLEAR_WISHLIST':
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
};

export const WishlistProvider = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    useEffect(() => {
        localStorage.setItem('eshop-wishlist', JSON.stringify(state.items));
    }, [state.items]);

    const addToWishlist = (product) => {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    };

    const removeFromWishlist = (id) => {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
    };

    const clearWishlist = () => {
        dispatch({ type: 'CLEAR_WISHLIST' });
    };

    const isInWishlist = (id) => {
        return state.items.some(item => item.id === id);
    };

    return (
        <WishlistContext.Provider value={{
            items: state.items,
            addToWishlist,
            removeFromWishlist,
            clearWishlist,
            isInWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

WishlistProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
