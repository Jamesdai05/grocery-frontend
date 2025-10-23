import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message.jsx";
import { MdDeleteForever } from "react-icons/md";
import { useCart } from "../hooks/useCart.js";

const CartPage = () => {
    const userinfo=localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
    const navigate = useNavigate();
    const {
        cartItems,
        removeFromCart,
        updateCartQuantity,
        totalPrice,
        cartItemsCount,
    } = useCart();

    const handleRemoveFromCart=(id)=>{
        removeFromCart(id);
    }

    const handleCheckout = () => {
        if(cartItems.length === 0) return;
        if(userinfo){
            navigate('/shipping');
            return;
        }
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
                                key={`cart-item-${item._id}`}
                                className="flex flex-col sm:flex-row items-center gap-4 px-4 border-b py-2 last:border-b-0"
                            >
                                <div className="sm:w-2/12 w-full">
                                    <img
                                        src={item.image}
                                        alt={item.name}
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
                                        onChange={(e) =>
                                            updateCartQuantity(
                                                item._id,
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        {[
                                            ...Array(
                                                Math.min(item.stock || 10, 10)
                                            ).keys(),
                                        ].map((x) => (
                                            <option
                                                key={`qty-${item._id}-${x + 1}`}  //why the key is needed with qty-item-x+1? as in this way react can identify each option uniquely when rendering the list, preventing potential issues with rendering and performance.
                                                value={x + 1}
                                            >
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="sm:w-2/12 mx-auto flex justify-center w-full">
                                    <button
                                        className="text-center bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                                        onClick={() =>
                                            handleRemoveFromCart(item._id)
                                        }
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
                    <h3 className="text-2xl mb-4">
                        Subtotal ({cartItemsCount}) items
                    </h3>
                    <h2 className="font-bold">Total:${totalPrice}</h2>
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
