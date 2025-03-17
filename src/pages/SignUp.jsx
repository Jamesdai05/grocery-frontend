import { useState } from "react";
import photo from "../../public/images/login-animation.gif";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const SignUp = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);

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
            className="mt-1 w-full bg-slate-300 p-1 my-1 py-1 px-2 focus:outline-blue-300"
            id="firstName"
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            placeholder="enter your first name"
            id="lastName"
            className="w-full bg-slate-300 p-1 my-1 py-1 px-2 focus:outline-blue-300"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="enter your email"
            id="email"
            className="w-full bg-slate-300 p-1 my-1 py-1 px-2 focus:outline-blue-300"
          />
          <label htmlFor="password">Password</label>
          <div className="flex justify-between items-center focus:border-blue-300">
            <input
              type="password"
              placeholder="enter your password"
              id="password"
              className="outline-none border-none w-full bg-slate-300 p-1 my-1 py-1 px-2 focus:outline-blue-300"
            />
            <span
              onClick={() => setIsPasswordShow((prev) => !prev)}
              className="bg-slate-300 p-2"
            >
              {!isPasswordShow ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex justify-between items-center focus:border-blue-300">
            <input
              type="confirmPassword"
              placeholder="confirm your password"
              id="password"
              className="outline-none border-none w-full bg-slate-300 p-1 my-1 py-1 px-2 focus:outline-blue-300"
            />
            <span
              onClick={() => setIsConfirmPasswordShow((prev) => !prev)}
              className="bg-slate-300 p-2"
            >
              {!isConfirmPasswordShow ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <button className="btn w-full bg-blue-500 mt-6 text-2xl text-white p-1 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
