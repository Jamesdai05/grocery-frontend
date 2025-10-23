import logo from "../../assets/logogrocery.png";
import "./header.css";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useCurrentUser, useLogOut } from "../../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";
import { useCart } from "../../hooks/useCart.js";
import { resetCart } from "../../store/cartSlice.js";
import { useDispatch } from "react-redux";




const Header = () => {

  const [isShow,setIsShow]=useState(false)
  const dispatch=useDispatch();

  const handleShowHandler=()=>setIsShow(prev=>!prev)

  const containerRef=useRef(null)

  const {data:user,isLoading}=useCurrentUser()


  const {mutate:logOut,isPending}=useLogOut()

  const { cartItemsCount } = useCart()

  const navigate=useNavigate();

  const handleLogOut=()=>{
    logOut();
    setIsShow(false);
    navigate("/login");
  }

  useEffect(()=>{
    const handleClickOutside=(e)=>{
      if(
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ){
          setIsShow(false);
        //   console.log(e.target)
        }
    }

    const handleEscKey=(e)=>{
        if(e.key === "Escape"){
            setIsShow(false);
        }
    }

    document.addEventListener("mousedown",handleClickOutside)
    document.addEventListener("keydown",handleEscKey);
    return ()=>{
        document.removeEventListener("mousedown",handleClickOutside);
        document.removeEventListener("keydown",handleEscKey);
    }
  },[])


  return (
      <header className="shadow-md w-full h-20 px-2 header">
          <div className="flex items-center justify-between max-w-[1500px] mx-auto h-full">
              <div className="logo w-24 flex items-center justify-center flex-grow-0 min-w-24">
                    <Link to="/" className="flex items-center w-16">
                        <img src={logo} alt="logo" className="w-20" />
                    </Link>
              </div>
              <div className="form md:flex flex-1 hidden mx-auto">
                  <input
                      type="text"
                      placeholder="Enter the product"
                      className="search"
                  />
                  <button className="btn-search">Search</button>
              </div>
              <div className="flex justify-between items-center gap-4 md:gap-7">
                  <nav className="flex justify-around gap-x-16 font-bold text-slate-500 text-xl">
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                  </nav>
                  <div className="text-2xl flex gap-x-6 text-slate-700 p-x-4 relative cursor-pointer">
                      <Link to="/cart">
                          <FaShoppingCart className="me-2" />
                          <div className="text-xs bg-red-500 w-[16px] h-[16px] rounded-full text-white absolute p-1 flex justify-center items-center top-[-5px] left-[16px]">
                              <p>{cartItemsCount}</p>
                          </div>
                      </Link>
                  </div>
                  <div className="user relative">
                      <button className="user-btn" ref={containerRef}>
                          <FaRegUserCircle
                              className="text-3xl me-2 cursor-pointer"
                              onClick={handleShowHandler}
                          />
                          <span>{user ? user?.username : "Account"}</span>
                          {isShow && (
                              <div className="absolute top-[38px] right-0 text-sm p-2 shadow-2xl bg-slate-100 dropdown drop-shadow-md tex-md">
                                  {user ? (
                                    <>
                                        {user.isAdmin && (<Link
                                            to="admin/new"
                                            className="dropdown-link"
                                        >
                                            New Product
                                        </Link>)}
                                        <Link
                                            to="/profile"
                                            className="dropdown-link"
                                        >
                                            User Profile
                                        </Link>
                                        <button
                                            onClick={handleLogOut}
                                            className="dropdown-link"
                                            disabled={isPending}
                                        >
                                            {isPending ? "Logging Out..." : "Log Out"}
                                        </button>
                                    </>
                                  ) : (
                                    <Link
                                        to="/login"
                                        className="dropdown-link"
                                        disabled={isPending}
                                    >
                                        Log In
                                    </Link>
                                )}
                              </div>
                          )}
                      </button>
                  </div>
              </div>
          </div>
      </header>
  );
}
export default Header