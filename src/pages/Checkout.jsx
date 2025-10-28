import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { createPayment } from "../apiCall/dataFetch.js";
import StripeCheckoutForm from "../components/StripeCheckOutForm.jsx";
import { useLocation } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const location = useLocation();
    const { orderId, totalPrice } = location.state || {};
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initPayment = async () => {
            try {
                const data = await createPayment(totalPrice * 100, orderId); // should return { clientSecret }
                console.log(data);
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Failed to initialize payment:", error);
                toast.error("Failed to start payment process!");
            } finally {
                setIsLoading(false);
            }
        };
        initPayment();
    }, [totalPrice, orderId]);

    if (isLoading)
        return <p className="text-center mt-10">Loading payment form...</p>;
    if (!clientSecret) return null;

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }} key={clientSecret}>
            <StripeCheckoutForm clientSecret={clientSecret} orderId={orderId} />
        </Elements>
    );
};

export default Checkout;
