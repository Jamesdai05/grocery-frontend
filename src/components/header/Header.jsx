import logo from "/images/logogrocery.png";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed shadow-md w-full h-20 px-2 header">
      <div className="">
        <Link to="/">
          <div className="flex justify-start items-center">
            <img src={logo} alt="logo" className="w-20" />
          </div>
        </Link>
      </div>
    </header>
  );
}
export default Header