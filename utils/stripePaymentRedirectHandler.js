import { useEffect } from "react";
import { toast } from "react-toastify";
import { updateOrderToPaid } from "../src/apiCall/dataFetch.js";

export const useStripeRedirectHandler = (stripe, orderId) => {
  useEffect(() => {
    const handleRedirect = async () => {
      if (!stripe) return;

      const params = new URLSearchParams(window.location.search);
      const clientSecret = params.get("payment_intent_client_secret");
      const redirectStatus = params.get("redirect_status");

      if (!clientSecret) return;

      try {
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

        if (paymentIntent?.status === "succeeded") {
          await updateOrderToPaid(orderId, {
            paymentIntent: {
              id: paymentIntent.id,
              status: paymentIntent.status,
              payment_method: paymentIntent.payment_method_types[0],
            },
          });
          toast.success("Payment successful! Order updated.");
        } else if (redirectStatus === "failed") {
          toast.error("Payment failed or canceled.");
        } else {
          console.log("PaymentIntent status:", paymentIntent?.status);
        }
      } catch (err) {
        console.error("Error confirming redirect payment:", err);
        toast.error("Could not confirm payment.");
      } finally {
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    handleRedirect();
  }, [stripe, orderId]);
};