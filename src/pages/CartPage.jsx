import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message.jsx";
import { MdDeleteForever } from "react-icons/md";
import { useCart } from "../hooks/useCart.js";

const CartPage = () => {
    const navigate = useNavigate();
    const { 
        cartItems, 
        removeFromCart, 
        updateCartQuantity, 
        totalPrice,
        itemsPrice 
    } = useCart();

    const handleCheckout = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
            <div className="md:w-8/12">
                <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
                {/* Cart items will be listed here */}
                {cartItems.length === 0 ? (
                    <div>
                        <Message type="info">
                            Your cart is empty.
                            <Link
                                to="/"
                                className="underline text-blue-500 font-bold"
                            >
                                Back
                            </Link>
                        </Message>
                    </div>
                ) : (
                    <div className="rounded-lg overflow-hidden shadow">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col sm:flex-row items-center gap-4 px-4 border-b last:border-b-0"
                            >
                                <div className="sm:w-2/12 w-full">
                                    <img
                                        src={item.image}
                                        alt="product"
                                        className="w-[150px] object-cover rounded"
                                    />
                                </div>
                                <div className="sm:w-3/12 w-full">
                                    <Link
                                        to={`/product/${item._id}`}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                </div>
                                <div className="sm:w-2/12 w-full text-center">
                                    ${item.price}
                                </div>
                                <div className="sm:w-2/12 w-full">
                                    <select
                                        value={item.qty}
                                        onChange={(e) => updateCartQuantity(item._id, Number(e.target.value))}
                                        className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        {[...Array(Math.min(item.stock || 10, 10)).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="sm:w-2/12 mx-auto flex justify-center w-full">
                                    <button 
                                        className="text-center bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        <MdDeleteForever
                                            style={{
                                                height: "30",
                                                width: "3em",
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="md:w-4/12 w-full">
                <div className="total-price p-4 border-2 border-gray-300 rounded">
                    <h2 className="text-2xl font-bold mb-4">
                        Subtotal ({cartItems.reduce((total, item) => total + item.qty, 0)}) Items 
                        ${itemsPrice}
                    </h2>
                    <button 
                        className="checkout-btn w-full"
                        disabled={cartItems.length === 0}
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CartPage;
