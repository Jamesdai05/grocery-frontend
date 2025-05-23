import { useState } from "react";
import photo from "../assets/login-animation.gif";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Login = () => {
  const [isPasswordShow,setIsPasswordShow]=useState(false);

  return (
    <div className="flex p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        <div className="text-center w-20 overflow-hidden rounded-full drop-shadow-md">
          <img src={photo} alt="user" className="w-full" />
        </div>
        <form className="w-full py-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="enter your email"
            id="email"
            className="w-full bg-slate-300 rounded-md p-1 my-1 py-1 px-2 outline-0 focus-within:outline focus-within:outline-blue-700 transition-colors"
          />
          <label htmlFor="password">Password</label>
          <div className="flex items-center bg-slate-300 rounded-md focus-within:outline focus-within:outline-blue-700 transition-colors">
            <input
              type={isPasswordShow ? "text" : "password"}
              placeholder="enter your password"
              id="password"
              className="w-full my-1 px-2 py-1 bg-slate-300 focus:outline-none rounded-l-md"
            />
            <span
              onClick={() => setIsPasswordShow((prev) => !prev)}
              className="bg-slate-300 px-2 py-2 rounded-r-md"
            >
              {!isPasswordShow ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <button className="btn w-full bg-blue-500 mt-6 text-2xl text-white p-1 rounded">
            Log In
          </button>
          <p className="py-4 px-2">
            Don't have an account?
            <Link
              to="/signup"
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
export default Login;
