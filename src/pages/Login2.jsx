import { useState } from "react";
import photo from "../assets/login-animation.gif";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


const Login2 = () => {
  const [isShow,setIsShow]=useState(false)

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        <div className="text-center w-20 overflow-hidden rounded-full drop-shadow-md">
          <img src={photo} alt="user" className="w-full" />
        </div>
        <form className="w-full py-3">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            placeholder="enter your last name"
            className="mt-1"
            id="firstName"
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            placeholder="enter your first name"
            id="lastName"
          />
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="enter your email" id="email" />
          <label htmlFor="password">Password</label>
          <div className="flex justify-between items-center">
            <input
              type="password"
              placeholder="enter your password"
              id="password"
            />
            <span onClick={() => setIsShow((prev) => !prev)} className="bg-slate-300 p-2">
              {!isShow ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="confirm your password"
            id="confirmPassword"
          />
          <button className="btn w-full bg-blue-500 mt-2 text-2xl text-white p-1 rounded">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
export default Login2;