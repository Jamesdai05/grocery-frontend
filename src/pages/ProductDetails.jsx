import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from '../components/Rating';
import { MdAddShoppingCart } from "react-icons/md";
import { useState } from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
import { fetchProductById } from "../apiCall/dataFetch.js";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useCart } from "../hooks/useCart.js";


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
    // const navigate = useNavigate();
    const { addToCart } = useCart();
    const [qty, setQty] = useState(1);

    console.log(productId);
    const {data:product,isLoading,error}=useQuery({
        queryKey: ['product',productId],
        queryFn: ()=>fetchProductById(productId)
    })

    const handleAddToCart = () => {
        if (product && qty > 0) {
            addToCart(product, qty);
        }
    };

    if(isLoading){
        return <Loader />
    }

    if(error){
        return <Message type="error">Error: {error.message}</Message>
    }



    return (
        <>
            <div className="flex flex-col max-w-[1200px] mx-auto ">
                <div className="my-4">
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
                                <h2>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</h2>
                            </div>
                            {product.stock > 0 && (
                                <div className="quantity item">
                                    <h2>Qty:</h2>
                                    <select
                                        className="bg-white border-2 rounded"
                                        name="quantity"
                                        id="quantity"
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                    >
                                        {[...Array(Math.min(product.stock || 10, 10)).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="addCart item">
                                <button
                                    className={`btn flex justify-between items-center gap-2 ${
                                        product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                >
                                    <MdAddShoppingCart />
                                    {product.stock === 0 ? 'Out of Stock' : 'Add To Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="review-form">
                    {/* {product.reviews.length === 0 && (
                            <Message>No review yet.</Message>
                        )} */}

                    <div className="col-span-1 md:col-span-6 row-span-4 w-full review-input ">
                        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
                        <select
                            name="review"
                            id="review"
                            className="border border-gray-300 rounded w-full md:w-[300px] px-3 py-2"
                        >
                            <option value="">Make a review</option>
                            <option value="1">Very Poor - 1</option>
                            <option value="2">Poor - 2</option>
                            <option value="3">Fair - 3</option>
                            <option value="4">Good - 4</option>
                            <option value="5">Excellent-5</option>
                        </select>
                        <form action="" className="mt-4">
                            <textarea
                                type="text"
                                rows="3"
                                className="border my-4 block rounded p-2 w-xl"
                                placeholder="enter the review"
                            />
                            <button type="submit" className="btn mt-2">
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