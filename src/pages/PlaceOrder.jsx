import CheckoutComponent from "../components/CheckoutComponent";

const PlaceOrder = () => {
    return (
        <div className="p-4 max-w-6xl mx-auto">
            <CheckoutComponent step1 step2 step3 step4 />
            <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
                <div className="md:w-8/12 w-full">
                    <h1 className="text-2xl my-4">Shipping</h1>
                    <hr className="border-b-0 border-gray-400" />
                    <div className="py-2 mb-4">
                        <h3 className="text-xl mb-2">Address:</h3>
                        <p className="italic">123 Main St, City, Country</p>
                    </div>
                    <hr className="border-b-0 border-gray-400" />
                    <div className="py-2 mb-4">
                        <p className="font-bold text-xl mb-2">
                            Payment method:{" "}
                            <span className="font-normal">Paypal</span>
                        </p>
                    </div>
                    <hr className="border-b-0 border-gray-400" />
                    <form action="" className="form-container max-w-4xl">
                        <div className="flex justify-flex-start gap-4">
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="PayPal"
                                value="PayPal"
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
                </div>
            </div>
        </div>
    );
};
export default PlaceOrder;
