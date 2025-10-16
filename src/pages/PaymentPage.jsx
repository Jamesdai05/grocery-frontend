import FormContainer from "../components/FormContainer";
import CheckoutComponent from "../components/CheckoutComponent";

const PaymentPage = () => {
  return (
    <FormContainer>
        <CheckoutComponent step1 step2 step3/>
        <h1 className="text-2xl font-bold my-6">Payment Method</h1>
        <form action="" className="form-container max-w-4xl">
            <div className="flex justify-flex-start gap-4">
                <input
                    type="radio"
                    name="paymentMethod"
                    id="PayPal"
                    value="PayPal"
                    className="mr-2"
                />
                <label htmlFor="PayPal" className="text-3xl">PayPal or Credit Card</label>
            </div>
            {/* <div className="form-control2">
                <input
                    type="radio"
                    name="paymentMethod"
                    id="Stripe"
                    value="Stripe"
                    className="mr-2"
                />
                <label htmlFor="Stripe">Stripe</label>
            </div> */}
            <div>
                <button type="submit" className="btn-primary btn">
                    Continue
                </button>
            </div>
        </form>
    </FormContainer>
  )
}
export default PaymentPage