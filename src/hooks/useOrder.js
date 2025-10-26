import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createdOrder } from "../apiCall/dataFetch.js";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../Slices/cartSlice.js";
import { fetchOrderById } from "../apiCall/dataFetch.js";
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
            toast.success("Order is created!")
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


    // Selectors