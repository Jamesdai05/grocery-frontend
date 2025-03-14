import logo from "/images/logogrocery.png";
import "./header.css";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header className="fixed shadow-md w-full h-20 px-2 header min-w-[800px]">
      <div className="flex items-center justify-between">
        <Link to="/">
          <div className="flex justify-start items-center">
            <img src={logo} alt="logo" className="w-20" />
          </div>
        </Link>
        <div className=" flex justify-between gap-x-[8rem]">
          <nav className="flex justify-around gap-x-16 font-bold text-slate-500 text-xl">
            <li as={Link} to="/">Home</li>
            <li as={Link} to="/about">About</li>
            <li as={Link} to="/menu">Menu</li>
            <li as={Link} to="/contact">Contact</li>
          </nav>
          <div className="text-2xl flex gap-x-6 text-slate-700 p-x-4">
            <FaUserAlt />
            <FaShoppingCart className="me-2"/>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header