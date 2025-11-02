import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { fetchAllProducts } from "../../apiCall/dataFetch.js";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import { toast } from "react-toastify";
import { useCreateProduct, useDeleteProduct } from "../../hooks/useProduct.js";



const Productlist = () => {
    const navigate=useNavigate();

    const {data:allProducts,isLoading,error}=useQuery({
        queryKey:["products"],
        queryFn:fetchAllProducts
    })

    const {mutate:createANewProduct,isPending:isCreating}=useCreateProduct();

    const {mutate:deleteProductById,isPending:isDeleting}=useDeleteProduct()

    // console.log(data.products)
    if(isLoading) return <Loader />;
    {error && <Message type="error">Error: {error.message}</Message>}

    const products=Array.isArray(allProducts.products) ? allProducts.products : [] ;

    console.log(products)
    console.log(typeof(allProducts))

    const handleDelete=(id)=>{
        if(window.confirm("Are you sure you want to delete this product?")
        ){
            deleteProductById(id);
        }
    }

    const handleEdit=async(id)=>{
        navigate(`/admin/product/${id}/edit`);
    }

    const handleCreate = () => {
        if (window.confirm("Are you sure you want to create a product?")) {
            try {
                createANewProduct();
                // toast.success("Template Product is created.");
            } catch (error) {
                toast.error(error?.data?.message || error?.error);
            }
        }
    }


  return (
      <div className="admin-list-container">
          <div className="flex justify-between items-center my-4">
              <h1 className="text-4xl font-semibold py-3">ProductList</h1>
              <button
                  className="btn flex items-center"
                  type="button"
                  onClick={handleCreate}
              ><IoIosCreate className="text-white"/>Create Product</button>
          </div>

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
                                  <button
                                      className="flex justify-center px-4"
                                      onClick={() => handleEdit(product._id)}
                                  >
                                      <FaRegEdit />
                                  </button>
                              </td>
                              <td>
                                  <button
                                      className="flex justify-center text-3xl"
                                      onClick={() => handleDelete(product._id)}
                                  >
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