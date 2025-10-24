import { useState } from "react";
import photo from "../assets/login-animation.gif";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Loader from "../components/Loader.jsx";
import { useLogin } from "../hooks/useAuth.js";
import { useDispatch } from "react-redux";
import { resetCart } from "../Slices/cartSlice.js";

const Login = () => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [inputData, setInputData] = useState({
        email: "",
        password: "",
    });

    const { mutate: login, isPending } = useLogin();

    const { search } = useLocation();

    const dispatch = useDispatch();

    const navigate = useNavigate();
    // to let user redirect to the page he wanted to go before login
    const redirect = new URLSearchParams(search).get("redirect") || "/";
    // navigate(redirect);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const togglePasswordVisibility = () => {
        setIsPasswordShow((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(inputData);
        if (!inputData.email || !inputData.password) return;
        login(inputData, {
            onSuccess: () => {
                dispatch(resetCart());
                navigate(redirect); // Redirect to the intended page after login
            },
        }); // call the api
    };

    if (isPending) {
        return <Loader />;
    }

    return (
        <div className="flex p-4 md:pt-24">
            <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
                <div className="text-center w-20 overflow-hidden rounded-full drop-shadow-md">
                    <img src={photo} alt="user" className="w-full" />
                </div>
                <form className="w-full py-3" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="enter your email"
                        id="email"
                        className="w-full bg-slate-300 rounded-md p-1 my-1 py-1 px-2 outline-0 focus-within:outline focus-within:outline-blue-700 transition-colors"
                        name="email"
                        value={inputData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                    <label htmlFor="password">Password</label>
                    <div className="flex items-center bg-slate-300 rounded-md focus-within:outline focus-within:outline-blue-700 transition-colors">
                        <input
                            type={isPasswordShow ? "text" : "password"}
                            placeholder="enter your password"
                            id="password"
                            className="w-full my-1 px-2 py-1 bg-slate-300 focus:outline-none rounded-l-md"
                            name="password"
                            value={inputData.password}
                            onChange={handleChange}
                            required
                            autoComplete="password"
                        />
                        <button
                            onClick={togglePasswordVisibility}
                            className="bg-slate-300 px-2 py-2 rounded-r-md"
                            type="button"
                            aria-label={
                                isPasswordShow
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {!isPasswordShow ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="btn w-full bg-blue-500 mt-6 text-2xl text-white p-1 rounded hover:bg-blue-600"
                        disabled={isPending}
                    >
                        {isPending ? "Logging in..." : "Login"}
                    </button>
                    <p className="py-4 px-2">
                        Don't have an account?
                        <Link
                            to="/signup"
                            style={{ textDecoration: "underline" }}
                            className="hover:text-blue-400"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default Login;
