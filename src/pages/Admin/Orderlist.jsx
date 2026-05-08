import { LuRefreshCw } from "react-icons/lu";
import { dateFormater } from "../../../utils/constants.js";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFetchAllOrders } from "../../hooks/useOrder.js";

const OrderList = () => {

    const { data: allOrders, isLoading, error, refetch,isFetching } = useFetchAllOrders();

    const handleClearAndRefetch=async()=>{
       await refetch();
    }

    if (isLoading) return <Loader />;

    if (error) return (
        <Message type="error">
            {error?.response?.data?.message ||
                error.message ||
                "Failed to load orders"}
        </Message>
    );
    // console.log(allOrders);

    const style = {
        color: "red",
        fontSize: "1.5rem",
        textAlign: "center",
    };

    return (
        <div className="admin-list-container">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-semibold py-3">OrderList</h1>
                <button
                    onClick={handleClearAndRefetch}
                    disabled={isFetching}
                    className="flex gap-2 items-center bg-blue-200 p-1 rounded text-blue-800 hover:text-white hover:bg-blue-500 duration-300
                "
                >
                    <LuRefreshCw /> {isFetching ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            <div className="overflow-x-auto shadow-md rounded-lg">
                {!allOrders || allOrders.length === 0 ? (
                    <Message type="info">No orders found</Message>
                ) : (
                    <table className="min-w-full border border-gray-200">
                        <thead className="uppercase bg-gray-400 p-4">
                            <tr>
                                <th className="text-left p-1">id</th>
                                <th className="p-2">user</th>
                                <th className="p-2">date</th>
                                <th>total</th>
                                <th>Paid</th>
                                <th>delivered</th>
                                <th>details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders?.map((order, ind) => (
                                <tr
                                    key={order._id}
                                    className={`my-2 text-lg text-center ${
                                        ind % 2 === 0
                                            ? "bg-gray-200"
                                            : "bg-white"
                                    }`}
                                >
                                    <td className="text-left p-1">
                                        {order._id}
                                    </td>
                                    {/* use a snapshot then fallback to populate user */}
                                    <td>{order.userInfo?.username ||order.user?.username || "unknown"}</td>
                                    <td>{dateFormater(order.createdAt)}</td>
                                    <td>${order.totalPrice.toFixed(2)}</td>
                                    <td className="td-style">
                                        {order.isPaid ? (
                                            dateFormater(order.paidAt)
                                        ) : (
                                            <FaTimes style={style} />
                                        )}
                                    </td>
                                    <td className="mx-auto">
                                        {order.deliveredAt ? (
                                            dateFormater(order.deliveredAt)
                                        ) : (
                                            <span className="flex justify-center">
                                                <FaTimes style={style} />
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/orders/${order._id}`}
                                            className="bg-gray-500 p-1 rounded-md text-white"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
export default OrderList;
