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
    return response.data;
}

export const createPayment=async(amount,orderId)=>{
    const response=await apiClient.post("/payments/create-payment",{
        amount,
        orderId,
    })
    return response.data;
}

export const updateOrderToPaid=async(orderId,paymentResult)=>{
    const response=await apiClient.put(`/orders/${orderId}/pay`,paymentResult);
    return response.data;
}
