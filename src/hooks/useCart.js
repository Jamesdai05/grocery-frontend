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
} from '../store/cartSlice.js';

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
    useEffect(() => {
    if (shippingAddress) {
        localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    }
  }, [shippingAddress]);

    useEffect(() => {
        if (paymentMethod) {
            localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
        }
    }, [paymentMethod]);

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