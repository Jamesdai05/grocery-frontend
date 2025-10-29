import CheckoutComponent from "../components/CheckoutComponent";
// import { useCart } from "../hooks/useCart.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { numberFormating } from "../../utils/cartUtils.js";
import Loader from "../components/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { useCreateOrder } from '../hooks/useOrder';
import { toast } from "react-toastify";
import Message from "../components/Message";



const PlaceOrder = () => {

    const {mutate:createOrder,isPending}=useCreateOrder()
    const {
        paymentMethod,
        shippingAddress,
        cartItems,
        shippingPrice,
        itemsPrice,
        totalPrice,
        taxPrice}=useSelector((state)=>state.cart)
    // console.log(useSelector((state) => state.cart).shippingAddress);
    const {address,city,postalCode,country}=shippingAddress

    // console.log(typeof(shippingPrice),itemsPrice,totalPrice,taxPrice)


    const addressInfo=address ? `${address}, ${city}, ${postalCode}, ${country}` :"No address provided"

    const navigate=useNavigate();

    const handlePlaceOrder=()=>{
        // console.log("Placing order the details:",shippingAddress,paymentMethod,cartItems);
        // handle order submit logic here
        if (!shippingAddress || !paymentMethod || cartItems.length === 0) {
            toast.error("Incomplete order information.Please check again.");
            return;
        }

        // Log the raw cart items first
        // console.log("Raw cartItems:", cartItems);

        // Transform cart items to match backend schema
        const orderItems = cartItems.map((item) => ({
            _id: item._id,
            name: item.name,
            qty: Number(item.qty),
            price: Number(item.price),
            image: item.image,
        }));

        const orderData = {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice: Number(itemsPrice),
            shippingPrice: Number(shippingPrice),
            taxPrice: Number(taxPrice),
            totalPrice: Number(totalPrice),
        };

        console.log("Sending order data:", orderData);

        createOrder(orderData, {
            onSuccess: (data) => {
                console.log("Order created successfully:", data);
                toast.success("Order placed successfully!");
                // Clear cart logic can be added here if needed
                navigate(`/orders/${data._id}`);
            },
            onError: (error) => {
                console.error("Error in creating order:", error);
            },
        });
    }

    if(isPending){
        return <Loader />
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <CheckoutComponent step1 step2 step3 step4 />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="rounded-lg p-4 bg-white">
                        <h1 className="text-2xl my-4">Shipping</h1>
                        <hr className="border-b-0 border-gray-400" />
                        <div className="py-2 mb-4">
                            <h3 className="text-xl mb-2">Address:</h3>
                            <p className="italic">{addressInfo}</p>
                        </div>
                        <hr className="border-b-0 border-gray-400" />
                    </div>
                    <div className="rounded-lg p-4 bg-white">
                        <p className="text-gray-700">
                            <strong>Payment Method:</strong>{" "}
                            <i>{paymentMethod}</i>
                        </p>
                    </div>
                    <div className="p-4 bg-white">
                        <strong>Cart Items:</strong>
                        {cartItems.length === 0 ? (
                            <Message>Your cart is empty.</Message>
                        ) : (
                            <ul className="divide-y divide-gray-200 mt-3 border-1 rounded-lg border-gray-300">
                                {cartItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center py-3 px-2"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md mr-4"
                                        />
                                        <div className="flex-1">
                                            <Link
                                                to={`/product/${item._id}`}
                                                className="text-blue-600 hover:underline font-medium"
                                            >
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="text-gray-700 font-semibold">
                                            {item.qty} X ${item.price} = $
                                            {numberFormating(
                                                item.qty * item.price
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="border rounded-lg p-4 bg-white shadow h-fit">
                    <h2 className="text-xl font-semibold mb-4">
                        Order Summary:
                    </h2>
                    <ul className="divide-y divide-gray-200">
                        <li className="flex justify-between py-2">
                            <span>Items Price:</span>
                            <span>${itemsPrice}</span>
                        </li>
                        <li className="flex justify-between py-2">
                            <span>Tax Price:</span>
                            <span>${taxPrice}</span>
                        </li>
                        <li className="flex justify-between py-2">
                            <span>Shipping Price:</span>
                            <span>${shippingPrice}</span>
                        </li>
                        <li className="flex justify-between py-2 font-semibold">
                            <span>Total Price:</span>
                            <span>${totalPrice}</span>
                        </li>
                    </ul>


                    <button
                        type="submit"
                        onClick={handlePlaceOrder}
                        disabled={cartItems.length === 0 || isPending}
                        className={`w-full mt-4 py-2 text-white font-semibold rounded ${
                            cartItems.length === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isPending ? "Placing Order..." : "Place Order"}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default PlaceOrder;
