import { useEffect, useState } from "react";
import Carousel from "../components/Carousel"
import { slides } from "../slides.js"
// import { fetchData } from "../dataFetch.js";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products,setProducts]=useState([])

  useEffect(()=>{
      const fetchData=async()=>{
        try{
          const response=await axios.get("/api/products");
          console.log(response.data);
          setProducts(response.data.products)
        }catch(e){
          console.log("Fetched data failed:",e)
          toast.error(e?.message || "Failed to fetch data!")
        }
      }
    fetchData()
  },[])


  return (
      <div className="flex justify-center items-center flex-col mx-auto w-full max-w-[100vw]">
          <Carousel slides={slides} />
          <div className="content">
              <div className="text">
                  <p className="text-left">Products</p>
              </div>
              <div className="list mt-3">
                  {products.map((product) => (
                      <ProductCard key={product._id} {...product} />
                  ))}
              </div>
          </div>
      </div>
  );
}
export default Home