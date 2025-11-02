import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { useState,useEffect } from "react";
import { category } from "../../../utils/constants.js";
import {
    useGetProduct,
    useUpdateProduct,
    useFileUpload,
} from "../../hooks/useProduct.js";
import Loader from '../../components/Loader';
import {toast} from "react-toastify"


const ProductEdit = () => {
    const {id:productId}=useParams()

    const {data:product,isLoading}=useGetProduct(productId);

    // const {mutate:createNewProduct,isPending:isCreating}=useCreateProduct();

    const {mutate:updateProduct,isPending}=useUpdateProduct(productId);

    const {mutate:uploadImage,isPending:isUploading}=useFileUpload()


    const navigate=useNavigate();


    const [formData,setFormData]=useState({
            name: "",
            price:"",
            description:"",
            category:"",
            stock:100,
            image:"https://www.example.com"
        });


    const handleChange=(e)=>{
        const {name,value}=e.target;

        setFormData(prev=>{
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const handleFileChange=(e)=>{
        const file=e.target.files?.[0];
        console.log(file)
        if(file){
            if (!file) return;
            if (!file.type.startsWith("image/")) {
                return toast.error("Please select an image file");
            }

            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                return toast.error("File size must be less than 5MB");
            }

            uploadImage(file, {
                onSuccess: (data) => {
                    setFormData((prev) => ({ ...prev, image: data.image }));
                },
                onError: (err) => {
                    toast.error("Error in file uploading");
                    console.error("Failed to upload file", err);
                },
            });
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        // console.log(formData);
        // below is a light verification;
        if (
            !formData.name ||
            !formData.image ||
            !formData.stock ||
            !formData.price ||
            !formData.description ||
            !formData.category
        )
            return toast.error("Please fill all fields");

        // Validate price is a number
        if (isNaN(formData.price) || Number(formData.price) <= 0) {
            return toast.error("Please enter a valid price");
        }

        // Validate stock is a number
        if (isNaN(formData.stock) || Number(formData.stock) < 0) {
            return toast.error("Please enter a valid stock quantity");
        }

        updateProduct(formData);
        navigate("/admin/productlist");
    }





    useEffect(()=>{
        if(product){
            setFormData({
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category || category[0] || "",
                stock: product.stock,
                image: product.image,
            });
        }
    },[product])

    if(isLoading) return <Loader />;
    if(!product) return <div>Product not found</div>;



    return (
        <FormContainer>
            <div className="mb-4">
                <Link className="btn " to={`/admin/productlist`}>
                    Go Back
                </Link>
            </div>
            <form className="form-container max-w-6xl" onSubmit={handleSubmit}>
                <div className="form-control2">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        className="form-input2"
                        name="name"
                        id="name"
                        placeholder="Enter name"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control2">
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        value={formData.price}
                        className="form-input2"
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control2">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        value={formData.description}
                        className="form-input2"
                        name="description"
                        id="description"
                        placeholder="Enter description"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control2">
                    <label htmlFor="category">Category</label>
                    <select
                        type="text"
                        value={formData.category}
                        className="form-input2"
                        name="category"
                        id="category"
                        onChange={handleChange}
                    >
                        {category.map((e) => (
                            <option key={e} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-control2">
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="number"
                        value={formData.stock}
                        className="form-input2"
                        name="stock"
                        id="stock"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control2">
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        value={formData.image}
                        className="form-input2"
                        name="image"
                        id="image"
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        aria-label="upload image"
                        className="file-input form-input2"
                        disabled={isUploading}
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <button type="submit" className="btn-primary btn" disabled={isPending}>
                        {isPending ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </FormContainer>
    );
}

export default ProductEdit;