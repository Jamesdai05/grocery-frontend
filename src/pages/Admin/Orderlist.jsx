import { fetchAllOrders } from "../../apiCall/dataFetch.js";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderList = () => {

    const {data:allOrders,isLoading,error}=useQuery({
        queryKey:['allOrders'],
        queryFn:fetchAllOrders,
    })



    if(isLoading)return <Loader />;

    if (error) return <Message type="error">{error.message}</Message>;
    console.log(allOrders);

    const style={
        color:"red",
        fontSize:"1.5rem",
        textAlign:"center",
    }



  return (
      <div className="admin-list-container">
          <h1 className="text-4xl font-semibold py-3">OrderList</h1>

          <div className="overflow-x-auto shadow-md rounded-lg">
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
                                  ind % 2 === 0 ? "bg-gray-200" : "bg-white"
                              }`}
                          >
                              <td className="text-left p-1">{order._id}</td>
                              <td>{order.user?.username || "unknown"}</td>
                              <td>{order.createdAt.slice(0, 10)}</td>
                              <td>${order.totalPrice.toFixed(2)}</td>
                              <td className="td-style">
                                  {order.isPaid ? (
                                      order.paidAt.slice(0, 10)
                                  ) : (
                                      <FaTimes style={style} />
                                  )}
                              </td>
                              <td className="mx-auto">
                                  {order.deliveredAt ? (
                                      order.deliveredAt.slice(0, 10)
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
          </div>
      </div>
  );
}
export default OrderList;