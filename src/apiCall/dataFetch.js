import { apiClient } from "./apiClient.js";
import { toast } from "react-toastify";

export const fetchData=async()=>{

    const response = await apiClient.get("/api/products")
    console.log(response.data)
    return response.data
}

export const fetchProductById=async(id)=>{
    const response = await apiClient.get(`/api/products/${id}`)
    console.log(response.data)
    return response.data
}

export const loginUser=async(userData)=>{
    const response = await apiClient.post("/api/users/login", userData);
    console.log(response.data);
    return response.data
}

export const userRegistration=async(userData)=>{
    const response = await apiClient.post("/api/users/register", userData);
    // console.log(response.data);
    return response.data
}

export const fetchCurrentUser=async()=>{
    const response = await apiClient.get("/api/users/current");
    // console.log(response.data);
    return response.data.user
}

export const logOutUser=async()=>{
    const response = await apiClient.post("/api/users/logout");
    return response.data
}