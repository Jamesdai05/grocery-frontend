import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { loadCartFromStorage } from '../Slices/cartSlice.js';
import authReducer from '../Slices/authSlice.js';

// Load initial cart state from localStorage
const loadCartState = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            return JSON.parse(savedCart);
        }
        return undefined;
    } catch (error) {
        console.warn('Error loading cart from localStorage:', error);
        return undefined;
    }
};

// Configure the store
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    },
    // Enable Redux DevTools in development
    devTools: import.meta.env.DEV,
    // Add middleware for better debugging
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for serializable check
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Load cart state from localStorage after store creation
const initializeCart = () => {
    const savedCart = loadCartState();
    if (savedCart) {
        store.dispatch(loadCartFromStorage(savedCart));
    }
};

// Initialize cart on store creation
initializeCart();