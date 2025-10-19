import { apiClient } from "./apiClient.js";


export const fetchData=async()=>{

    const response = await apiClient.get("/products")
    console.log(response.data)
    return response.data
}

export const fetchProductById=async(id)=>{
    const response = await apiClient.get(`/products/${id}`)
    console.log(response.data)
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

export const fetchCurrentUser=async()=>{
    const response = await apiClient.get("/users/current");
    // console.log(response.data);
    return response.data.user
}

export const logOutUser=async()=>{
    const response = await apiClient.post("/users/logout");
    return response.data
}