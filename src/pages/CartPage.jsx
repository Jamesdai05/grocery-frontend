import { Link } from "react-router-dom";
import Message from "../components/Message.jsx";
import { MdDeleteForever } from "react-icons/md";

const CartPage = () => {
    const cartItems = [
        {
            _id: "6893706d467c59e3b2cad467",
            user: "6893706d467c59e3b2cad456",
            name: "Amazfit T-Rex 3 Military Smart Watch 48mm",
            image: "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13022342_XL1_20230210.jpg?w=320&q=60",
            brand: "AMAZFIT",
            price: 299.99,
        },
        {
            _id: "6893706d467c59e3b2cad467",
            user: "6893706d467c59e3b2cad456",
            name: "Amazfit T-Rex 3 Military Smart Watch 48mm",
            image: "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13022342_XL1_20230210.jpg?w=320&q=60",
            brand: "AMAZFIT",
            price: 299.99,
        },
    ]; // This should come from your state or context
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
                                key={item.id}
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
                                    <a
                                        href={`/product/${item._id}`}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {item.name}
                                    </a>
                                </div>
                                <div className="sm:w-2/12 w-full text-center">
                                    ${item.price}
                                </div>
                                <div className="sm:w-2/12 w-full">
                                    <select
                                        value={item.qty}
                                        className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        {[...Array(3).keys()].map((e) => (
                                            <option key={e + 1} value={e + 1}>
                                                {e + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="sm:w-2/12 mx-auto flex justify-center w-full">
                                    <button className="text-center bg-red-500 hover:bg-red-600 text-white p-1 rounded">
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
                        Subtotal price (total) Items $
                        {cartItems
                            .reduce((acc, item) => acc + item.price, 0)
                            .toFixed(2)}
                    </h2>
                    <button className="checkout-btn">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CartPage;
