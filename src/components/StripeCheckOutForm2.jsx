import {
    useStripe,
    useElements,
    PaymentElement,
    // CardNumberElement,
    // CardExpiryElement,
    // CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
// import { cardElementOptions } from "../../utils/cardStyle.js";
import { updateOrderToPaid } from "../apiCall/dataFetch.js";
import {useStripeRedirectHandler} from "../../utils/stripePaymentRedirectHandler.js"

const StripeCheckoutForm2 = ({ clientSecret, orderId }) => {
    const stripe = useStripe();
    const elements = useElements();

    console.log(clientSecret);
    // const [cardholderName, setCardholderName] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

    //handle Alipay/PayNow redirect
    useStripeRedirectHandler(stripe, orderId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            toast.error("Stripe has not been loaded!");
            return;
        }
        setIsProcessing(true);
        // setErrors("");

        try {
            /* confirm payment */
            const isRedirectPayment =
                selectedPaymentMethod === "alipay" ||
                selectedPaymentMethod === "paynow" ||
                selectedPaymentMethod === "grabpay";

            const { error: paymentError, paymentIntent } =
                await stripe.confirmPayment({
                    elements,
                    confirmParams: isRedirectPayment ?
                    {return_url: `${window.location.origin}/orders/${orderId}?payment=success`} : {},
                    redirect: isRedirectPayment ? "always" : "if_required", //apply for the cards,alway for the alipay and paynow.
                });

            if (paymentError) {
                toast.error(paymentError.message || "Payment failed");
                setIsProcessing(false);
                return;
            }

            if (paymentIntent && paymentIntent.status === "succeeded") {
                try {
                    // Update order as paid in backend

                    await updateOrderToPaid(orderId, {
                        paymentIntent: {
                            id: paymentIntent.id,
                            status: paymentIntent.status,
                            email_address: paymentIntent.receipt_email,
                        },
                    });

                    toast.success("Payment successful!");

                    // Redirect to order page
                    setTimeout(() => {
                        window.location.href = `/orders/${orderId}`;
                    }, 1500);
                } catch (e) {
                    console.error("Error updating order:", e);
                    toast.error("An error occurred during payment processing");
                    // setErrors(e.message);
                }
            }
        } catch (e) {
            toast.error("An error occurred during payment processing");
            console.error("Payment error:", e);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form
            className="space-y-6 max-w-lg w-full flex justify-center mx-auto flex-col
        "
            onSubmit={handleSubmit}
        >
            {/* Stripe Payment Element - handles all payment methods */}
            <PaymentElement
                options={{
                    layout: "tabs", // Shows payment methods as tabs
                    paymentMethodOrder: ["card", "paynow", "alipay", "grabpay"],
                }}
                onChange={(e) => {
                    // PaymentElement onChange event shape can vary; inspect in console to be sure
                    // We'll defensively try to extract the selected payment method type
                    // Common shapes: e?.value?.type, e?.type, or fallback to 'card' if complete
                    const method =
                        e?.value?.type ||
                        e?.type ||
                        (e?.complete ? "card" : "");
                    // normalize to lowercase
                    const normalized = method
                        ? String(method).toLowerCase()
                        : "";
                    setSelectedPaymentMethod(normalized);
                    // Helpful debug during development
                    // console.log('PaymentElement change event:', e, 'selected:', normalized);
                }}
            />

            {/* Submit */}
            <button
                type="submit"
                disabled={isProcessing || !stripe}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isProcessing ? "Processing..." : `Pay now`}
            </button>
        </form>
    );
};

export default StripeCheckoutForm2;
