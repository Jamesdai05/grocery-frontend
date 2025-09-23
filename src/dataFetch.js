import axios from "axios";
import { toast } from "react-toastify";

export const fetchData=async()=>{
    try{
        const response = await axios("/api/products")
        console.log(response.data)
        return response.data
    }catch(err){
        console.error("Fetch data error:",err)
        toast.error(err?.message)
    }
}