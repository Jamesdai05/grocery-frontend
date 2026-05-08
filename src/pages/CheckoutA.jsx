import { useState, useEffect } from "react";
import { useElements,Elements,useStripe,} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { createPayment } from "../apiCall/dataFetch.js";
import StripeCheckoutForm2 from "../components/StripeCheckOutForm2.jsx";
import { useUpdateOrderToPaid } from "../hooks/useOrder.js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutA = ({ orderId, totalPrice }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // const stripe=useStripe();

    // const elements = useElements();
    const { mutate: markPaid } = useUpdateOrderToPaid();

    useEffect(() => {
        const initPayment = async () => {
            try {
                const data = await createPayment(totalPrice * 100, orderId); // should return { clientSecret }
                // console.log(data);
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

    if (isLoading || !clientSecret)
        return <p className="text-center mt-10">Loading payment form...</p>;
    if (!clientSecret) return null;

    // Customize appearance
    const appearance = {
        theme: "stripe",
        variables: {
            colorPrimary: "#2563eb",
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <Elements stripe={stripePromise} options={options} key={clientSecret}>
            <StripeCheckoutForm2
                clientSecret={clientSecret}
                orderId={orderId}
            />
        </Elements>
    );
};

export default CheckoutA;
