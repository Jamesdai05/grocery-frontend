import logo from "/images/logogrocery.png";
import "./header.css";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";


const Header = () => {

  const [isShow,setIsShow]=useState(false)

  const handleShowHandler=()=>setIsShow(prev=>!prev)


  return (
    <header className="shadow-md w-full h-20 px-2 header min-w-[800px]">
      <div className="flex items-center justify-between">
        <Link to="/">
          <div className="flex justify-start items-center">
            <img src={logo} alt="logo" className="w-20" />
          </div>
        </Link>
        <div className="flex justify-between gap-4 md:gap-7">
          <nav className="flex justify-around gap-x-16 font-bold text-slate-500 text-xl">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </nav>
          <div className="text-2xl flex gap-x-6 text-slate-700 p-x-4 relative">
            <FaShoppingCart className="me-2" />
            <div className="text-xs bg-red-500 w-[16px] h-[16px] rounded-full text-white absolute p-1 text-center top-[-5px] left-[16px]">
              0
            </div>
          </div>
          <div className="user">
            <FaRegUserCircle
              className="text-3xl me-2"
              onClick={handleShowHandler}
            />
            {isShow && (
              <div className="absolute top-[58px] right-0 text-sm p-4 shadow-2xl bg-slate-100 dropdown drop-shadow-md tex-md">
                <Link to="/new" className="cursor-pointer whitespace-nowrap tex-xl block p-4">
                  New Product
                </Link>
                <Link to="/login" className="cursor-pointer whitespace-nowrap block p-4">Log In</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header