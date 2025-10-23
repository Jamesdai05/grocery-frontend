import { useState } from "react";
import photo from "../assets/login-animation.gif";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { useDispatch } from "react-redux";
import {useRegister} from "../hooks/useAuth.js"
import Loader from "../components/Loader";

// import axios from "axios";

const SignUp = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);
  const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })
    const navigate=useNavigate()

    const {mutate:register,isPending}=useRegister()
    // const dispatch=useDispatch()


    const handleConfirmPassword=()=>setIsConfirmPasswordShow(prev=>!prev)

    const handleChange=(e)=>{
        const {name,value}=e.target;
            setFormData(prev=>{
                return {
                ...prev,
                [name]:value,
                }
            })
    }

    const formValidation=()=>{
        if (formData.password !== formData.confirmPassword) {
            toast.error("passwords do not match");
            return false;
        }
        if (formData.password.length < 6) {
            toast.error("password must be at least 6 characters");
            return false;
        }
        if (
            !formData.email ||
            !formData.username ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            toast.error("All fields are required");
            return false;
        }
        return true;
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!formValidation()){
            return
        }



        register(formData,{
            onSuccess:()=>{
                navigate("/")
            }
        });// call the api


    }

    if (isPending) {
        return <Loader />;
    }
    // if (error) {
    //     return <Message type="error">{error && error.message}</Message>;
    // }

    return (
        <div className="flex p-4 md:pt-24">
            <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
                <div className="text-center w-20 overflow-hidden rounded-full drop-shadow-md">
                    <img src={photo} alt="user" className="w-full" />
                </div>
                <form className="w-full py-3" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="enter your first name"
                        className="mt-1 w-full bg-slate-300 rounded-md p-1 my-1 py-1 px-2 outline-0 focus-within:outline focus-within:outline-blue-700 transition-colors"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="enter your email"
                        id="email"
                        className="w-full bg-slate-300 rounded-md p-1 my-1 py-1 px-2 outline-0 focus-within:outline focus-within:outline-blue-700 transition-colors"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <div className="flex items-center bg-slate-300 rounded-md focus-within:outline focus-within:outline-blue-700 transition-colors">
                        <input
                            type={isPasswordShow ? "text" : "password"}
                            placeholder="enter your password"
                            id="password"
                            className="w-full my-1 px-2 py-1 bg-slate-300 focus:outline-none rounded-l-md"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span
                            onClick={() => setIsPasswordShow((prev) => !prev)}
                            className="bg-slate-300 px-2 py-2 rounded-r-md"
                        >
                            {!isPasswordShow ? <FaRegEye /> : <FaRegEyeSlash />}
                        </span>
                    </div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="flex items-center bg-slate-300 rounded-md focus-within:outline focus-within:outline-blue-700 transition-colors">
                        <input
                            type={isConfirmPasswordShow ? "text" : "password"}
                            className="w-full my-1 px-2 py-1 bg-slate-300 focus:outline-none rounded-l-md"
                            placeholder="confirm the password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="bg-slate-300 px-2 py-2 rounded-r-md"
                            onClick={handleConfirmPassword}
                        >
                            {!isConfirmPasswordShow ? (
                                <FaRegEye />
                            ) : (
                                <FaRegEyeSlash />
                            )}
                        </span>
                    </div>
                    <button
                        disabled={isPending}
                        className="btn w-full bg-blue-500 mt-6 text-2xl text-white p-1 rounded">
                        {isPending ? "Registering..." : "Sign Up"}
                    </button>
                    <p className="py-4 px-2">
                        Already got an account?
                        <Link
                            to="/login"
                            style={{ textDecoration: "underline" }}
                            className="hover:text-blue-400"
                        >
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default SignUp;
