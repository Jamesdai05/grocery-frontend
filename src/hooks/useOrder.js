import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createdOrder, createPayment, updateOrderToPaid } from "../apiCall/dataFetch.js";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../Slices/cartSlice.js";
import { fetchMyOrders,fetchOrderById } from "../apiCall/dataFetch.js";
import { toast } from "react-toastify";


export const useCreateOrder=()=>{
    const dispatch=useDispatch()
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:createdOrder,

        onSuccess:(data)=>{
            queryClient.setQueryData(["orders", data._id], data);
            dispatch(clearCartItems());
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            // toast.success("Order is created!")
        },

        onError:(err)=>{
            toast.error(err?.response?.data?.message || err.message || "Failed to create order");
        }
    })
}

// Custom hook for order operations
export const useGetOrderDetails=(orderId)=>{
    return useQuery({
        queryKey:["orders",orderId],
        queryFn:()=>fetchOrderById(orderId),
        enabled:!!orderId, //only run when the orderId is truthy
        retry: false,
        onError:(err)=>{
            toast.error(err?.response?.data?.message || err.message || "Failed to fetch order details");
        }
    })
}

export const usePayOrder=(amount,orderId)=>{
    return useMutation({
        mutationKey:["payOrder",orderId],
        mutationFn:()=>createPayment(amount,orderId),
        onSuccess:(data)=>{
            if(data.url){
                window.location.href = data.url;
            }else {
            toast.warn("No redirect URL received.");
            };
        },
        onError:(err)=>{
            console.error("Payment initiation error",err)
            toast.error(err?.response?.data?.message || err.message || "Failed to process payment");
        }
    })
}


export const useUpdateOrderToPaid = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId, paymentResult }) => updateOrderToPaid(orderId, paymentResult),
        onSuccess: (data, variables) => {
            // Invalidate and refetch order details
            queryClient.invalidateQueries({ queryKey: ["orders", variables.orderId] });
            toast.success("Order payment updated successfully!");
        },
        onError: (err) => {
            console.error("Error updating order payment:", err);
            toast.error(err?.response?.data?.message || err.message || "Failed to update order payment");
        }
    });
};

export const useGetMyOrder=()=>{
    return useQuery({
        queryKey:["myOrder"],
        queryFn:fetchMyOrders,
        retry:1,
        refetchOnWindowFocus:false, // prevents refetch + toast spam when window refocuses
        onError:(err)=>{
            toast.error(err?.response?.data?.message || err.message || "Failed to fetch order details");
        },
        onSuccess:(data)=>{
            // toast.success("Get my order successfully!");
            console.log("Fetched my orders successfully", data);
        }
    })
}

// Selectors
