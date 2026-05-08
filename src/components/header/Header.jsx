import logo from "../../assets/logogrocery.png";
import "./header.css";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegUserCircle,FaBars,FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useLogOut } from "../../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";
import { useCart } from "../../hooks/useCart.js";
// import { resetCart } from "../../store/cartSlice.js";
import { useSelector } from "react-redux";




const Header = () => {

  const [isShow,setIsShow]=useState(false)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const dispatch=useDispatch();

  const toggleShow=()=>setIsShow(prev=>!prev)

  const toggleMobileMenu =()=>setIsMobileMenuOpen(prev=>!prev);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const containerRef=useRef(null)
  const mobileMenuRef=useRef(null)

  const user=useSelector(state=>state.auth.userInfo);
//   console.log(userInfo)


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
      <header className="shadow-md w-full h-20 px-2 header sticky top-0 bg-white z-50">
          <div className="flex items-center justify-between max-w-[1500px] mx-auto h-full">
              {/* Logo */}
              <div className="logo flex items-center justify-center flex-grow-0 min-w-0">
                  <Link to="/" className="flex items-center">
                      <img
                          src={logo}
                          alt="Grocery store logo"
                          className="w-14 sm:w-16 md:w-20 lg:w-24 object-contain"
                      />
                  </Link>
              </div>

              {/* Search Bar - Hidden on small mobile, visible on md and up */}
              {/* <div className="form hidden md:flex flex-1 mx-auto">
                  <input
                      type="text"
                      placeholder="Enter the product"
                      className="search"
                  />
                  <button className="btn-search">Search</button>
              </div> */}

              {/* Desktop Navigation - Hidden on small screens (shown from md) */}
              <div className="hidden md:flex justify-between items-center gap-4 md:gap-7">
                  <nav className="flex justify-around gap-x-16 font-bold text-slate-500 text-xl">
                      <li className="list-none">
                          <Link
                              to="/"
                              className="hover:text-slate-700 transition-colors"
                          >
                              Home
                          </Link>
                      </li>
                  </nav>

                  {/* Cart Icon */}
                  <div className="text-2xl relative cursor-pointer">
                      <Link
                          to="/cart"
                          className="flex items-center text-slate-700 hover:text-slate-900 transition-colors"
                      >
                          <FaShoppingCart />
                          {cartItemsCount > 0 && (
                              <div className="text-xs bg-red-500 w-4 h-4 rounded-full text-white absolute flex justify-center items-center -top-1 left-4">
                                  <p>{cartItemsCount}</p>
                              </div>
                          )}
                      </Link>
                  </div>

                  {/* User Dropdown */}
                  <div className="user relative" ref={containerRef}>
                      <button
                          onClick={toggleShow}
                          className="user-btn"
                          aria-label="User menu"
                      >
                          <FaRegUserCircle className="text-3xl cursor-pointer text-slate-700 hover:text-slate-900 transition-colors" />
                      </button>

                      {isShow && (
                          <div className="absolute top-10 right-0 text-sm p-2 shadow-2xl bg-slate-100 dropdown drop-shadow-md min-w-[150px] rounded-md z-50">
                              {user ? (
                                  <>
                                      {user.isAdmin && (
                                          <>
                                              <li>
                                                  <Link
                                                      to="/admin/productlist"
                                                      onClick={closeMobileMenu}
                                                      className="dropdown-link block px-4 py-2 hover:bg-slate-200 rounded transition-colors"
                                                  >
                                                      ProductList
                                                  </Link>
                                              </li>
                                              <li>
                                                  <Link
                                                      to="/admin/orderlist"
                                                      onClick={closeMobileMenu}
                                                      className="dropdown-link block px-4 py-2 hover:bg-slate-200 rounded transition-colors"
                                                  >
                                                      All Orders
                                                  </Link>
                                              </li>
                                              <li>
                                                  <Link
                                                      to="/admin/userlist"
                                                      onClick={closeMobileMenu}
                                                      className="dropdown-link block px-4 py-2 hover:bg-slate-200 rounded transition-colors"
                                                  >
                                                      All Users
                                                  </Link>
                                              </li>
                                          </>
                                      )}
                                      <Link
                                          to="/profile"
                                          onClick={() => setIsShow(false)}
                                          className="dropdown-link block px-4 py-2 hover:bg-slate-200 rounded transition-colors"
                                      >
                                          User Profile
                                      </Link>
                                      <button
                                          onClick={handleLogOut}
                                          disabled={isPending}
                                          className="dropdown-link block w-full text-left px-4 py-2 hover:bg-slate-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-red-600"
                                      >
                                          {isPending
                                              ? "Logging Out..."
                                              : "Log Out"}
                                      </button>
                                  </>
                              ) : (
                                  <Link
                                      to="/login"
                                      onClick={() => setIsShow(false)}
                                      className="dropdown-link block px-4 py-2 hover:bg-slate-200 rounded transition-colors"
                                  >
                                      Log In
                                  </Link>
                              )}
                          </div>
                      )}
                  </div>
              </div>

              {/* Mobile Menu Button - Visible below md */}
              <div className="md:hidden flex items-center gap-4">
                  {/* Cart Icon for Mobile */}
                  <Link to="/cart" className="relative text-2xl text-slate-700">
                      <FaShoppingCart />
                      {cartItemsCount > 0 && (
                          <div className="text-xs bg-red-500 w-4 h-4 rounded-full text-white absolute flex justify-center items-center -top-1 left-4">
                              <p>{cartItemsCount}</p>
                          </div>
                      )}
                  </Link>

                  {/* Burger Menu Button */}
                  <button
                      onClick={toggleMobileMenu}
                      className="text-3xl text-slate-700 hover:text-slate-900 transition-colors"
                      aria-label="Toggle menu"
                  >
                      {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                  </button>
              </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
              <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                  onClick={closeMobileMenu}
              />
          )}

          {/* Mobile Menu Sidebar */}
          <div
              ref={mobileMenuRef}
              onClick={(e) => e.stopPropagation()} // prevent overlay click when interacting with menu
              className={`fixed top-0 right-0 h-full w-72 sm:w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                  isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
              <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                      <h2 className="text-xl font-bold text-slate-700">Menu</h2>
                      <button
                          onClick={closeMobileMenu}
                          className="text-2xl text-slate-700 hover:text-slate-900"
                          aria-label="Close menu"
                      >
                          <FaTimes />
                      </button>
                  </div>

                  {/* Mobile Menu Content */}
                  <nav className="flex-1 overflow-y-auto p-4">
                      {/* User Info Section */}
                      {user && (
                          <div className="mb-6 pb-4 border-b">
                              <div className="flex items-center gap-3">
                                  <FaRegUserCircle className="text-4xl text-slate-700" />
                                  <div>
                                      <p className="font-semibold text-slate-800">
                                          {user.username}
                                      </p>
                                      <p className="text-sm text-slate-500">
                                          {user.email}
                                      </p>
                                  </div>
                              </div>
                          </div>
                      )}

                      {/* Search Bar for Mobile */}
                      <div className="mb-4">
                          <input
                              type="text"
                              placeholder="Search products..."
                              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>

                      {/* Navigation Links */}
                      <ul className="space-y-2">
                          <li>
                              <Link
                                  to="/"
                                  onClick={closeMobileMenu}
                                  className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                              >
                                  Home
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to="/cart"
                                  onClick={closeMobileMenu}
                                  className="px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-md transition-colors flex items-center justify-between"
                              >
                                  <span>Cart</span>
                                  {cartItemsCount > 0 && (
                                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                          {cartItemsCount}
                                      </span>
                                  )}
                              </Link>
                          </li>
                          {user ? (
                              <>
                                  {user.isAdmin && (
                                      <>
                                          <li>
                                              <Link
                                                  to="/admin/product/new"
                                                  onClick={closeMobileMenu}
                                                  className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                                              >
                                                  New Product
                                              </Link>
                                          </li>
                                          <li>
                                              <Link
                                                  to="/admin/productlist"
                                                  onClick={closeMobileMenu}
                                                  className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                                              >
                                                  ProductList
                                              </Link>
                                          </li>
                                          <li>
                                              <Link
                                                  to="/admin/orderslist"
                                                  onClick={closeMobileMenu}
                                                  className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                                              >
                                                  All Orders
                                              </Link>
                                          </li>
                                          <li>
                                              <Link
                                                  to="/admin/userlist"
                                                  onClick={closeMobileMenu}
                                                  className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                                              >
                                                  All Users
                                              </Link>
                                          </li>
                                      </>
                                  )}
                                  <li>
                                      <Link
                                          to="/profile"
                                          onClick={closeMobileMenu}
                                          className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                                      >
                                          User Profile
                                      </Link>
                                  </li>
                              </>
                          ) : (
                              <li>
                                  <Link
                                      to="/login"
                                      onClick={closeMobileMenu}
                                      className="block px-4 py-3 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition-colors"
                                  >
                                      Log In
                                  </Link>
                              </li>
                          )}
                      </ul>
                  </nav>

                  {/* Logout Button at Bottom */}
                  {user && (
                      <div className="p-4 border-t">
                          <button
                              onClick={handleLogOut}
                              disabled={isPending}
                              className="w-full px-4 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                              {isPending ? "Logging Out..." : "Log Out"}
                          </button>
                      </div>
                  )}
              </div>
          </div>
      </header>
  );
}
export default Header