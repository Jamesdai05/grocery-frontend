import { useEffect, useMemo, useState } from "react";
import Carousel from "../components/Carousel"
// import { slides } from "../slides.js"
import { useTop3Products } from "../hooks/useProduct.js";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { selectFilters,selectSortBy,selectViewMode } from "../Slices/productSlice.js";
import ProductFilters from "../components/ProductFilters";
import { filterAndSortProducts } from "../store/productSelectors.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    const {data:top3Products,isLoading,isError}=useTop3Products();
    const [productsError, setProductsError] = useState(null);
    console.log(top3Products)

    // Get filter state from Redux
    const filters = useSelector(selectFilters);
    const sortBy = useSelector(selectSortBy);
    const viewMode = useSelector(selectViewMode);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoadingProducts(true);
                setProductsError(null)
                const response = await axios.get("/api/products");
                //   console.log(response.data);
                setProducts(response.data.products);
            } catch (e) {
                console.log("Fetched data failed:", e);
                const errorMsg=e?.response?.data?.message || e?.message || "Failed to fetch products"
                setProductsError(errorMsg);
                toast.error(errorMsg);
            } finally{
                setIsLoadingProducts(false);
            }
        };
        fetchData();
    }, []);



    const displayProducts=useMemo(()=>{
        return filterAndSortProducts(products,filters,sortBy);
    },[products,filters,sortBy])

    if (isLoadingProducts) return <Loader />;

    if(productsError) {
        return(
            <div className="flex justify-center items-center min-h-screen">
                <Message>{productsError}</Message>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center flex-col mx-auto w-full max-w-[100vw]">
            <Carousel slides={top3Products} isLoading={isLoading} isError={isError}/>
            <div className="content">
                <div className="text">
                    <p className="text-left">Products</p>
                </div>
                <ProductFilters />

                {/* show results count*/}
                <div className="text-sm text-gray-600 mb-2">
                    Showing {displayProducts.length} of {products.length}{" "}
                    products
                </div>
                <div className={`list mt-3 ${viewMode === "grid" ? "grid-view" : "list-view"}`}>

                    {displayProducts.length ===0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <h4>No products found matching the filers</h4>
                        </div>):(
                            displayProducts.map((product)=>(<ProductCard key={product._id} {...product} />))
                        )
                    }
                </div>
            </div>
        </div>
    );
}
export default Home