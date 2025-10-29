import {
    useStripe,
    useElements,
    PaymentElement,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import { cardElementOptions } from "../../utils/cardStyle.js";
import { updateOrderToPaid } from "../apiCall/dataFetch.js";

const StripeCheckoutForm = ({ clientSecret, orderId }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [cardholderName, setCardholderName] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleCardChange = (field) => (e) => {
        if (e.error) {
            setErrors((prev) => ({ ...prev, [field]: e.error.message }));
        } else {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[field];
                return copy;
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!cardholderName.trim())
            newErrors.cardholderName = "Cardholder name is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !validateForm()) return;

        setIsProcessing(true);

        try {
            const cardNumberElement = elements.getElement(CardNumberElement);
            const { error: paymentError, paymentMethod } =
                await stripe.createPaymentMethod({
                    // type: "card",
                    card: cardNumberElement,
                    billing_details: { name: cardholderName },
                    automatic_payment_methods: { enabled: true },
                });

            if (paymentError) {
                toast.error(paymentError.message || "Payment failed");
                setIsProcessing(false);
                return;
            }

            // confirm payment on clientSecret

            const { error: confirmError, paymentIntent } =
                await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id,
                });

            if (confirmError) {
                toast.error(confirmError.message);
                setIsProcessing(false);
                return;
            }

            // Payment successful - update order status
            if (paymentIntent.status === "succeeded") {
                try {
                    // Update order as paid in backend
                    await updateOrderToPaid(orderId, {
                        paymentIntent: {
                            id: paymentIntent.id,
                            status: paymentIntent.status,
                            update_time: new Date().toISOString(),
                            email_address: paymentIntent.receipt_email,
                        },
                    });

                    toast.success("Payment successful!");

                    // Redirect to order page
                    setTimeout(() => {
                        window.location.href = `/order/${orderId}`;
                    }, 1500);
                } catch (updateError) {
                    console.error("Error updating order:", updateError);
                    toast.error(
                        "Payment succeeded but failed to update order. Please contact support."
                    );
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
            {/* Cardholder Name */}
            <div>
                <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-600 mt-1"
                >
                    Name on Card *
                </label>
                <input
                    type="text"
                    onChange={(e) => setCardholderName(e.target.value)}
                    value={cardholderName}
                    className={`text-sm w-full p-2 mt-1 border rounded ${
                        errors.cardholderName
                            ? "border-red-500"
                            : "border-gray-300"
                    }`}
                />
            </div>
            {errors.cardholderName && (
                <p className="text-red-500 text-sm">{errors.cardholderName}</p>
            )}
            {/* Card Number */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                </label>
                <div
                    className={`mt-1 p-2 border rounded ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                    }`}
                >
                    <CardNumberElement
                        options={cardElementOptions}
                        onChange={handleCardChange("cardNumber")}
                    />
                </div>
                {errors.cardNumber && (
                    <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                )}
            </div>

            {/* Expiry & CVC */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry *
                    </label>
                    <div className="mt-1 p-2 border rounded">
                        <CardExpiryElement
                            options={cardElementOptions}
                            onChange={handleCardChange("cardExpiry")}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVC *
                    </label>
                    <div className="mt-1 p-2 border rounded">
                        <CardCvcElement
                            options={cardElementOptions}
                            onChange={handleCardChange("cardCvc")}
                        />
                    </div>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isProcessing || !stripe}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isProcessing ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

export default StripeCheckoutForm;
