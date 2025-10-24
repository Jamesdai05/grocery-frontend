import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
import {updateCart} from "/utils/cartUtils.js";

// Initial state
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: '',
    };

// Create the cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item._id === newItem._id);

            if (existingItem) {
                // Update quantity if item already exists
                state.cartItems=state.cartItems.map(e=>e._id===existingItem._id ? newItem : e)
            } else {
                // Add new item
                state.cartItems.push(newItem);
            }


            return updateCart(state)
        },

        updateCartQty:(state,action)=>{
            const {id,qty}=action.payload;
            const item = state.cartItems.find(item => item._id === id);

            if(item){
                if(item.qty<0){
                    state.cartItems=state.cartItems.filter(item=>item._id !==id)
                }

                item.qty=Number(qty);
            }
            updateCart(state)
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item._id !== itemId);

            // Calculate and update prices
            updateCart(state)
        },

        clearCart: (state) => {
            // Reset to initial state
            console.log(state)
            state.cartItems=[]
            updateCart(state)
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;

            // Save to localStorage
            updateCart(state)
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;

            // Save to localStorage
            updateCart(state)
        },

        resetCart:(state)=>{
            state.cartItems = [];
            state.shippingAddress = {};
            state.paymentMethod = '';
            return updateCart(state);
        },
        loadCartFromStorage:(state,action)=>{
            return {...state,...action.payload}
        }
    },
});

// Export actions
export const {
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    saveShippingAddress,
    savePaymentMethod,
    loadCartFromStorage,
    resetCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.cartItems || [];

export const selectCartItemsCount = (state) =>
    (state.cart.cartItems || []).reduce((total, item) => total + (item.qty || 0), 0);


export const selectCartPrices = (state) => ({
    itemsPrice: state.cart.itemsPrice || 0,
    shippingPrice: state.cart.shippingPrice || 0,
    taxPrice: state.cart.taxPrice || 0,
    totalPrice: state.cart.totalPrice || 0,
});
export const selectShippingAddress = (state) => state.cart.shippingAddress;
export const selectPaymentMethod = (state) => state.cart.paymentMethod;

// Export reducer
export default cartSlice.reducer;