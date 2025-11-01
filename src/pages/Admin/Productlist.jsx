import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { fetchAllProducts } from "../../apiCall/dataFetch.js";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import { deleteProductById } from "../../apiCall/dataFetch.js";
import { toast } from "react-toastify";


const Productlist = () => {

    const {data:allProducts,isLoading,error}=useQuery({
        queryKey:["products"],
        queryFn:fetchAllProducts
    })
    // console.log(data.products)
    if(isLoading) return <Loader />;
    {error && <Message type="error">Error: {error.message}</Message>}

    const products=Array.isArray(allProducts.products) ? allProducts.products : [] ;

    console.log(products)
    console.log(typeof(allProducts))

    const handleDelete=async(id)=>{
        if(window.confirm("Are you sure you want to delete this product?")
        ){
            await deleteProductById(id);
        }
        toast.success("Product deleted");
    }


  return (
      <div className="admin-list-container">
          <h1 className="text-4xl font-semibold py-3">OrderList</h1>

          <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full border border-gray-200">
                  <thead className="uppercase bg-gray-400 p-4">
                      <tr>
                          <th className="text-left p-1">SN</th>
                          <th className="text-left p-1">id</th>
                          <th className="p-2">product_name</th>
                          <th>price</th>
                          <th>category</th>
                          <th>Stock</th>
                          <th className="px-4" colSpan={2}>
                              Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.map((product, ind) => (
                          <tr
                              key={product._id}
                              className={`my-2 text-lg text-center p-1 ${
                                  ind % 2 === 0 ? "bg-gray-200" : "bg-white"
                              }`}
                          >
                              <td className="text-left p-1">{ind + 1}</td>
                              <td className="text-left p-1">{product._id}</td>
                              <td className="max-w-[30ch] p-1">
                                  {product.name || "unknown"}
                              </td>
                              {/* <td>{product.createdAt.slice(0, 10)}</td> */}
                              <td>${product.price.toFixed(2)}</td>
                              <td className="max-w-[30ch]">
                                  {product.category}
                              </td>
                              <td>{product.stock}</td>
                              <td>
                                  <button className="flex justify-center px-4" onClick={()=>console.log(`delete ${product._id}
                                  `)}>
                                      <FaRegEdit />
                                  </button>
                              </td>
                              <td>
                                  <button className="flex justify-center text-3xl" onClick={()=>handleDelete(product._id)}>
                                      <MdDeleteForever className="text-red-500" />
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
}

export default Productlist;