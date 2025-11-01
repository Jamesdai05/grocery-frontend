import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { deleteProductById,editProductById } from "../apiCall/dataFetch.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export useDeleteProduct=()=>{
    const QueryClient=useQueryClient();
    const dispatch=useDispatch()
    return useMutation({
        mutationKey:["deleteProduct"],
        mutationFn:deleteProductById,
        onSuccess:()=>{
            toast.success("Product deleted successfully!");
            QueryClient.invalidateQueries("products");
            
        }
    })
}