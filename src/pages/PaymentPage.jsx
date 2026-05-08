import FormContainer from "../components/FormContainer";
import CheckoutComponent from "../components/CheckoutComponent";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";
import { useState } from "react";

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState("");

    const navigate = useNavigate();

    const { savePaymentMethod } = useCart();
    // console.log("Selected payment method:", paymentMethod);

    const handleChange = (e) => setPaymentMethod(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        navigate("/placeOrder");
    };

    return (
        <FormContainer>
            <CheckoutComponent step1 step2 step3 />
            <form
                action="/placeOrder"
                className="form-container max-w-4xl"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold my-6">Payment Method</h1>
                <div className="radio-group">
                    <input
                        type="radio"
                        name="paymentMethod"
                        id="Stripe"
                        value="Stripe"
                        className="mr-2"
                        defaultChecked={paymentMethod ==="stripe"}
                        onChange={handleChange}
                    />
                    <label htmlFor="Stripe" className="text-3xl">
                        Stripe (Card, Alipay, PayNow)
                    </label>
                </div>
                <div className="radio-group">
                    <input
                        type="radio"
                        name="paymentMethod"
                        id="PayPal"
                        value="PayPal"
                        checked={paymentMethod === "PayPal"}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="PayPal" className="text-3xl">
                        PayPal or Credit Card
                    </label>
                </div>

                <div>
                    <button type="submit" className="btn-primary btn">
                        Continue
                    </button>
                </div>
            </form>
        </FormContainer>
    );
};
export default PaymentPage;
