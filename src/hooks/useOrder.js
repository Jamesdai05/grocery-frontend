import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createdOrder, createPayment, updateOrderToPaid,fetchAllOrders } from "../apiCall/dataFetch.js";
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
            dispatch(clearCartItems());
            // queryClient.setQueriesData(["orders", data._id], data);


            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["myOrders"] });
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
        refetchOnReconnect:true,
        // onError:(err)=>{
        //     toast.error(err?.response?.data?.message || err.message || "Failed to fetch order details");
        // }
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
            // update the specific order cache.
            queryClient.setQueryData(["orders",variables.orderId],data)
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
        staleTime: 5 * 60 * 1000,
        // onError:(err)=>{
        //     toast.error(err?.response?.data?.message || err.message || "Failed to fetch order details");
        // },
        // onSuccess:(data)=>{
        //     // toast.success("Get my order successfully!");
        //     console.log("Fetched my orders successfully", data);
        // }
    })
}

export const useFetchAllOrders=()=>{

    return useQuery({
        queryKey:["allOrder"],
        queryFn:fetchAllOrders,
        retry:1,
        refetchOnWindowFocus:false, // prevents refetch + toast spam when window refocuses
        staleTime:3*60 * 1000,
    })
}


