import { Link, useParams } from "react-router-dom";
import Rating from '../components/Rating';
import { MdAddShoppingCart } from "react-icons/md";
// import { useEffect, useState } from "react";
// import axios from "axios";
import { fetchProductById } from "../apiCall/dataFetch.js";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";


const ProductDetails = () => {

    // below is conventional fetch method

    // const [product,setProduct]=useState({})
    // const {id:productId}=useParams()
    // console.log(productId)

    // useEffect(()=>{
    //     const fetchProduct=async()=>{
    //         try{
    //             const response=await axios.get(`/api/products/${productId}`)
    //             console.log(response.data)
    //             setProduct(response.data)
    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
    //     fetchProduct()

    // },[productId])

    // console.log(product)

    // below is react query method

    const { id: productId } = useParams();
    console.log(productId);
    const {data:product,isLoading,error}=useQuery({
        queryKey: ['product',productId],
        queryFn: ()=>fetchProductById(productId)
    })

    if(isLoading){
        return <Loader />
    }

    if(error){
        return <Message type="error">Error: {error.message}</Message>
    }



    return (
        <>
            <div className="content flex flex-col">
                <div className="my-4 ms-10">
                    <Link to="/" className="btn">
                        Go Back
                    </Link>
                </div>
                <div className="content2">
                    <div className="product-card">
                        <div className="product-img">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full object-cover"
                            />
                        </div>
                        <div className="details">
                            <h2 className="text-bold">{product.name}</h2>
                            <div className="review">
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} Reviews`}
                                />
                            </div>
                            <h3 className="text-xl">Price:${product.price}</h3>
                            <p className="leading-normal">
                                {product.description}
                            </p>
                        </div>
                        <div className="price-info">
                            <div className="price item">
                                <h2>Price</h2>
                                <h2>${product.price}</h2>
                            </div>
                            <div className="price item">
                                <h2>Status</h2>
                                <h2>{product.status}</h2>
                            </div>
                            <div className="quantity item">
                                <h2>Qty:</h2>
                                <select
                                    className="bg-white border-2 rounded"
                                    name="quantity"
                                    id="quantity"
                                >
                                    <option value="">Select qty</option>
                                    <option value="1">1</option>
                                    <option value="1">2</option>
                                    <option value="1">3</option>
                                    <option value="1">4</option>
                                    <option value="1">5</option>
                                </select>
                            </div>
                            <div className="addCart item">
                                <button className="btn flex justify-between items-center gap-2">
                                    <MdAddShoppingCart />
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row-span-4 md:col-span-6 w-full mx-auto mt-4">
                    {/* {product.reviews.length === 0 && (
                            <Message>No review yet.</Message>
                        )} */}

                    <div className="w-full review-input col-span-4 md:col-span-6 ms-12">
                        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
                        <select
                            name="review"
                            id="review"
                            className="border-1 w-xl rounded"
                        >
                            <option value="">Make a review</option>
                            <option value="1">Very Poor - 1</option>
                            <option value="2">Poor - 2</option>
                            <option value="3">Fair - 3</option>
                            <option value="4">Good - 4</option>
                            <option value="5">Excellent-5</option>
                        </select>
                        <form action="">
                            <textarea
                                type="text"
                                rows="3"
                                className="border-1 my-4 block rounded p-2 w-xl"
                                placeholder="enter the review"
                            />
                            <button type="submit" className="btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductDetails