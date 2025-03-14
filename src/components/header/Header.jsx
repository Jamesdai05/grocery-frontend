import logo from "/images/logogrocery.png";
import "./header.css";

const Header = () => {
  return (
    <header className="fixed shadow-md w-full h-20 px-2 header">
      <div className="">

        <div className="">
          <img src={logo} alt="logo" className="w-20"/>
        </div>
      </div>

    </header>
  )
}
export default Header