import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { deleteProductById,fetchProductById, updateProductById,uploadFile,createNewProduct, getTop3Products} from "../apiCall/dataFetch.js";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";

export const useDeleteProduct=()=>{
    const queryClient=useQueryClient();
    // const dispatch=useDispatch()
    return useMutation({
        mutationKey:["deleteProduct"],
        mutationFn:(id)=>deleteProductById(id),
        onSuccess:()=>{
            toast.success("Product deleted successfully!");
            queryClient.invalidateQueries(["products"]);

        }
    })
}

export const useCreateProduct=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationKey:["createProduct"],
        mutationFn: createNewProduct,
        onSuccess:()=>{
            toast.success("Product created successfully!");
            queryClient.invalidateQueries(["products"]);
        },

        onError:(err)=>{
            toast.error("Failed to create product.");
            console.error("Error creating product:", err);
        }

    })
}

export const useGetProduct = (productId) => {
    return useQuery({
        queryKey: ["product", productId],
        queryFn: () => fetchProductById(productId),
        enabled: !!productId, // only run if productId exists
        retry: 3,
        refetchOnWindowFocus: false,
        staleTime: 2 * 60 * 1000, // 2 mins
    });
};

export const useUpdateProduct=(productId)=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationKey:["updateProduct",productId],
        mutationFn:(productData)=>updateProductById(productId,productData),
        onSuccess:(data)=>{
            // queryClient.setQueryData(["product",productId],data);
            queryClient.invalidateQueries(["product"]);
            toast.success("Product updated successfully!");
        },
        onError:(e)=>{
            console.error("Error in updating product",e)
            toast.error("Failed to update product.");
        },
    })
}


export const useTop3Products = ()=>{
    return useQuery({
        queryKey:["topProducts"],
        queryFn:getTop3Products,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 2, // Retry failed requests up to 2 times
    })
}


export const useFileUpload=()=>{
    // const queryClient=useQueryClient();

    return useMutation({
        mutationKey:["uploadFiles"],
        mutationFn:uploadFile,
        onSuccess:(data)=>{
            toast.success("File uploaded successfully!");
            console.log("File URL:", data.image);
        },
        onError: (error) => {
            console.error("File upload failed:", error);
            toast.error("File upload failed");
        }
    })
}

