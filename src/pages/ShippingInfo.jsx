import FormContainer from "../components/FormContainer";
import CheckoutComponent from "../components/CheckoutComponent";
import { useNavigate } from "react-router-dom";

import { useCart } from "../hooks/useCart.js";



const ShippingInfo = () => {

    const {saveShippingAddress}=useCart()

    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("form submitted")
        const form=e.target;
        const shippingInfo={
            address:form.address.value,
            city:form.city.value,
            postalCode:form['postal code'].value,
            country:form.country.value
        }
        saveShippingAddress(shippingInfo);
        navigate('/payment')
        }

    return (
        <FormContainer>
            <CheckoutComponent step1 step2/>
            <form action="/payment" className="form-container max-w-6xl" onSumbit={handleSubmit}>
                <h1 className="text-2xl font-bold my-6">Shipping Info</h1>
                <div className="form-control2">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Enter address"
                        className="form-input2"
                    />
                </div>
                <div className="form-control2">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Enter city"
                        className="form-input2"
                    />
                </div>
                <div className="form-control2">
                    <label htmlFor="postal code">Postal Code</label>
                    <input
                        type="text"
                        name="postal code"
                        id="postal code"
                        placeholder="Enter postal code"
                        className="form-input2"
                    />
                </div>
                <div className="form-control2">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder="Enter country"
                        className="form-input2"
                    />
                </div>
                <div>
                    <button type="submit" className="btn-primary btn">
                        Continue
                    </button>
                </div>
            </form>
        </FormContainer>
    )
}
export default ShippingInfo