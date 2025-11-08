import { numberFormating } from "../../utils/cartUtils.js";
import { Link,useLocation,useParams } from "react-router-dom";
import Message from "../components/Message.jsx";
import { useGetOrderDetails, useUpdateOrderToPaid } from '../hooks/useOrder.js';
import Loader from "../components/Loader.jsx";
import { useEffect, useState } from "react";
// import StripeCheckoutForm from "../components/StripeCheckOutForm";
// import Checkout from "./Checkout";
// import motion from "framer-motion";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CheckoutA from "./CheckoutA.jsx";
import { dateFormater } from "../../utils/constants.js";
// import { useStripe } from "@stripe/react-stripe-js";
// import { updateOrderToPaid } from "../apiCall/dataFetch.js";
import { toast } from "react-toastify";




const OrderPage = () => {

    const {id:orderId}=useParams()

    const [isModalOpen,setIsModalOpen]=useState(false);


    // console.log(orderId);

    // const navigate = useNavigate();
    const {
        data: orderData,
        isLoading,
        error,
        isError,
        refetch,
    } = useGetOrderDetails(orderId, {
        // refetchOnWindowFocus: true, // optional for alipay and wechat
        staleTime: 0, //  optional for alipay and wechat
    });

    const location=useLocation();
    const paymentQuery=new URLSearchParams(location.search).get("payment");

    const {mutate:markPaid}=useUpdateOrderToPaid()



    useEffect(()=>{
        if(!isLoading && paymentQuery === "success" && orderData && !orderData.isPaid ){
            markPaid(
                {
                    orderId,
                    paymentResult: {
                        id: orderData.paymentResult?.id || "Alipay",
                        status: "succeeded",
                        update_time: new Date().toISOString(),
                        email_address:
                            orderData.user.email ||
                            orderData.userInfo?.email ||
                            "unknown",
                    },
                },
                {
                    onSuccess: () => {
                    //    toast.success("Payment confirmed successfully!");
                       setTimeout(() => refetch(), 1500);
                    },
                }
            );
        }
    }, [paymentQuery, orderData, orderId, markPaid, refetch,isLoading])

    useEffect(()=>{
        if(isError){
            toast.error(error?.response?.data?.message || error?.error || "Failed to load order")
        }

    },[error,isError])


    if(isLoading){
        return <Loader />
    }

    if(isError) return <Message type="error">{error?.response?.data?.message || "failed to load data"}</Message>

    const toggleModalOpen=()=>setIsModalOpen(prev=>!prev)
    const {
        paymentMethod,
        itemsPrice,
        totalPrice,
        taxPrice,
        shippingPrice,
        shippingAddress,
        orderItems,
        user
    } = orderData

    const { address, city, postalCode, country } = shippingAddress || {};

    const addressInfo = address
        ? `${address}, ${city}, ${postalCode}, ${country}`
        : "No address provided";

    if(!orderData) return <Message type="error">No order is founded!</Message>

  return (
      <div className="p-4 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bolder">{orderId}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                  <div className="rounded-lg p-4 bg-white">
                      <h1 className="text-2xl my-4">Shipping</h1>
                      <hr className="border-b-0 border-gray-400" />
                      <div className="text-lg mb-2">
                          <p>
                              <b>Name:</b> {user?.username || "Unknown"}
                          </p>
                      </div>
                      <div className="text-lg mb-2">
                          <p>
                              <b>Email:</b> {user.email}
                          </p>
                      </div>
                      <div className="py-2 mb-4">
                          <h3 className="text-xl mb-2 font-bold">Address:</h3>
                          <p className="italic">{addressInfo}</p>
                      </div>
                      <Message
                          type={orderData.isDelivered ? "success" : "error"}
                      >
                          {orderData.isDelivered
                              ? `Order is delivered at ${dateFormater(
                                    orderData.deliveredAt
                                )}`
                              : "Order is not delivered yet."}
                      </Message>
                      <hr className="border-b-0 border-gray-400" />
                  </div>
                  <div className="rounded-lg p-4 bg-white mt-4">
                      <p className="text-gray-700 text-lg">
                          <strong>Payment Method:</strong>{" "}
                          <i>{paymentMethod}</i>
                      </p>
                      <Message type={orderData.isPaid ? "success" : "error"}>
                          {orderData.isPaid
                              ? `Order is paid at ${dateFormater(
                                    orderData.paidAt
                                )}.`
                              : "Order is not paid yet."}
                      </Message>
                  </div>
                  <div className="p-4 bg-white">
                      <strong>Cart Items:</strong>
                      {orderItems.length === 0 ? (
                          <Message>Your cart is empty.</Message>
                      ) : (
                          <ul className="divide-y divide-gray-200 mt-3 border-1 rounded-lg border-gray-300">
                              {orderItems.map((item, index) => (
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
                  <h2 className="text-xl font-semibold mb-4">Order Summary:</h2>
                  <ul className="divide-y divide-gray-200">
                      <li className="flex justify-between py-2">
                          <span>Items Price:</span>
                          <span>${itemsPrice.toFixed(2)}</span>
                      </li>
                      <li className="flex justify-between py-2">
                          <span>Tax Price:</span>
                          <span>${taxPrice.toFixed(2)}</span>
                      </li>
                      <li className="flex justify-between py-2">
                          <span>Shipping Price:</span>
                          <span>${shippingPrice.toFixed(2)}</span>
                      </li>
                      <li className="flex justify-between py-2 font-semibold">
                          <span>Total Price:</span>
                          <span>${totalPrice.toFixed(2)}</span>
                      </li>
                  </ul>

                  <button
                      type="submit"
                      //   onClick={handlePlaceOrder}
                      onClick={toggleModalOpen}
                      disabled={
                          orderItems.length === 0 ||
                          isLoading ||
                          orderData.isPaid
                      }
                      className={`w-full mt-4 py-2 text-white font-semibold rounded ${
                          orderItems.length === 0 || orderData.isPaid
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                      CheckOut
                  </button>
              </div>
          </div>
          {isModalOpen && (
              <motion.div
                  className="fixed inset-0 bg-blue-300 bg-opacity-50 flex items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
              >
                  <motion.div
                      className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative opacity-50"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                  >
                      <button
                          onClick={toggleModalOpen}
                          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                      >
                          ✕
                      </button>
                      <h2 className="text-xl font-semibold mb-4">
                          Complete Your Payment
                      </h2>

                      {/* <Checkout orderId={orderId} totalPrice={totalPrice} /> */}
                      <CheckoutA
                          orderId={orderId}
                          totalPrice={totalPrice}
                          onSuccess={toggleModalOpen}
                          paymentMethod={paymentMethod}
                      />
                  </motion.div>
              </motion.div>
          )}
      </div>
  );
}
export default OrderPage