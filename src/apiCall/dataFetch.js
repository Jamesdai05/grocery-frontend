import { apiClient } from "./apiClient.js";


export const fetchData=async()=>{

    const response = await apiClient.get("/products")
    console.log(response.data)
    return response.data
}

export const fetchProductById=async(id)=>{
    const response = await apiClient.get(`/products/${id}`)
    // console.log(response.data)
    return response.data
}

export const loginUser=async(userData)=>{
    const response = await apiClient.post("/users/login", userData);
    console.log(response.data);
    return response.data
}

export const userRegistration=async(userData)=>{
    const response = await apiClient.post("/users/register", userData);
    // console.log(response.data);
    return response.data
}

// export const fetchCurrentUser=async()=>{
//     try {
//         const res = await apiClient.get("/users/current");
//     if (res.status === 200) {
//         return res.data; // user object
//     }
//         return null; // no user logged in
//     } catch (error) {
//         return null; // handle network error gracefully
//   }
// }

export const logOutUser=async()=>{
    const response = await apiClient.post("/users/logout");
    return response.data
}

export const fetchUserProfile=async()=>{
    const response=await apiClient.get("/users/profile");
    console.log(response.data);
    return response.data;
}

export const updateUserProfile=async(data)=>{
    const response=await apiClient.put("/users/profile",data);
    console.log(response.data)
    return response.data
}

// order related api calls below
export const createdOrder=async(data)=>{
    const response=await apiClient.post("/orders",data);
    console.log("Payload:",response.data);
    return response.data;
}

export const fetchOrderById=async(orderId)=>{
    const response=await apiClient.get(`/orders/${orderId}`);
    return response.data;
}

export const fetchMyOrders=async()=>{
    const response=await apiClient.get("/orders/mine");
    console.log(response.data);
    return response.data;
}

export const createPayment=async(amount,orderId)=>{
    const response=await apiClient.post("/payments/create-payment",{
        amount,
        orderId,
        currency:"sgd" // this one is cater for the alipay or paynow.
    })
    return response.data;
}

export const updateOrderToPaid=async(orderId,paymentResult)=>{
    const response=await apiClient.put(`/orders/${orderId}/pay`,paymentResult);
    return response.data;
}

export const fetchAllOrders=async()=>{
    const response=await apiClient.get("/orders");
    return response.data;
}

export const fetchAllProducts=async()=>{
    const response=await apiClient.get("/products");
    // console.log(response)
    return response.data
}

export const deleteProductById=async(producId)=>{
    const {data}=await apiClient.delete(`/products/${producId}`);
    return data;
}



export const updateProductById=async(productId,productData)=>{
    const {data}=await apiClient.put(`/products/${productId}`,productData);
    console.log(data);
    return data;
}

export const uploadFile=async(file)=>{
    try{
        const formData = new FormData();
        formData.append("image", file); // "image" must match multer field name

        const { data } = await apiClient.post("/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Uploaded file data:", data);
        return data;
    }catch(err){
        console.error("failed to upload the file",err);
        console.log(err?.response?.data || err?.message);
    }
}

export const createNewProduct=async(productData)=>{
    const {data}=await apiClient.post("/products/new",productData);
    return data;
}

export const fetchAllUsers=async()=>{
    const {data}=await apiClient.get("/users");
    return data;
}

export const deleteUserById=async(userId)=>{
    const {data}=await apiClient.delete(`/users/admin/${userId}`);
    return data;
}



