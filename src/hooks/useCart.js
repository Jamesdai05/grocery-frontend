import { useSelector, useDispatch } from 'react-redux';
import {
    addToCart as addToCartAction,
    removeFromCart as removeFromCartAction,
    updateCartQty as updateCartQtyAction,
    clearCart as clearCartAction,
    saveShippingAddress as saveShippingAddressAction,
    savePaymentMethod as savePaymentMethodAction,
    selectCartItems,
    selectCartItemsCount,
    selectShippingAddress,
    selectPaymentMethod,
} from '../Slices/cartSlice.js';

import {
    selectCartPrices,
} from "../store/cartSelectors.js";
import { useEffect } from 'react';

// Custom hook for cart operations
export const useCart = () => {
    const dispatch = useDispatch();

    // Selectors
    const cartItems = useSelector(selectCartItems);
    const cartItemsCount = useSelector(selectCartItemsCount);
    const cartPrices = useSelector(selectCartPrices);
    const shippingAddress = useSelector(selectShippingAddress);
    const paymentMethod = useSelector(selectPaymentMethod);



    // --- Persist cart to localStorage whenever cart changes ---
    useEffect(()=>{
        const cartState={
            cartItems,
            shippingAddress,
            paymentMethod,
        }
        // only save to localStorage if there is a item.
        if(cartItems.length >0){
            localStorage.setItem("cart",JSON.stringify({
                ...cartState,
                ...cartPrices,
            }))
        }else{
            localStorage.removeItem("cart");
        }
    },[cartItems,shippingAddress,paymentMethod,cartPrices])

    // Action creators
    const addToCart = (product, qty = 1) => {
        const cartItem = {
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            stock: product.stock,
            qty: Number(qty),
        };

        dispatch(addToCartAction(cartItem));
    };

    const removeFromCart = (id) => {
        dispatch(removeFromCartAction(id));
    };

    const updateCartQuantity = (id, qty) => {
        if (qty <= 0) {
            removeFromCart(id);
            return;
        }
        dispatch(updateCartQtyAction({ id, qty }));
    };



    const clearCart = () => {
        dispatch(clearCartAction());
    };

    const saveShippingAddress = (address) => {
        dispatch(saveShippingAddressAction(address));
    };

    const savePaymentMethod = (method) => {
        dispatch(savePaymentMethodAction(method));
    };

    return {
        // State
        cartItems,
        cartItemsCount,
        shippingAddress,
        paymentMethod,
        ...cartPrices,

        // Actions
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        saveShippingAddress,
        savePaymentMethod,
    };
};