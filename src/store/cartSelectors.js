import { createSelector } from '@reduxjs/toolkit';

import {
    selectCartItems,
} from './cartSlice.js';

// basic cart state
export const selectCart=(state)=>state.cart;

// Selector for cart Prices
export const selectCartPrices = createSelector(
    [selectCart],
    (cart) => ({
        itemsPrice: cart.itemsPrice || 0,
        shippingPrice: cart.shippingPrice || 0,
        taxPrice: cart.taxPrice || 0,
        totalPrice: cart.totalPrice || 0,
}));


// Advanced selectors using createSelector for memoization
export const selectCartState = (state) => state.cart;

// Memoized selector for cart total items
export const selectCartTotalItems = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, item) => total + item.qty, 0)
);

// Memoized selector for cart total value
export const selectCartTotalValue = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, item) => total + (item.price * item.qty), 0)
);

// Selector for specific item by ID
// export const removeCartItemById = createSelector(
//     [selectCartItems, (state, itemId) => itemId],
//     (cartItems, itemId) => cartItems.filter(item => item._id !== itemId)
// );


// Selector for cart with shipping eligibility
export const selectShippingEligibility = createSelector(
    [selectCartTotalValue],
    (totalValue) => ({
        isEligibleForFreeShipping: totalValue >= 100,
        amountNeededForFreeShipping: Math.max(0, 100 - totalValue),
    })
);
