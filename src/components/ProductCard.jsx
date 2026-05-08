import Rating from "./Rating";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../hooks/useCart.js";

const ProductCard = ({_id,image,name,numReviews,price,rating}) => {

    const {addToCart}=useCart();
    const product={
        _id,
        image,
        rating,
        numReviews,
        name,
        price
    };

    const handleAddToCart=()=>{
        if(product){
            addToCart(product,1);
        }
    }

  return (
      <div className="product px-2 bg-gray-100 border-2 rounded border-gray-300">
          <Link to={`/product/${_id}`}>
              <div className="image">
                  <img src={image} className="h-[15rem] object-cover" />
              </div>
          </Link>
          <div className="info px-2">
              <Link to={`/product/${_id}`}>
                  <h3 className="title text-blue-500 bold">{name}</h3>
              </Link>
              <Rating
                  value={rating}
                  text={`${numReviews} Reviews`}
                  className="mb-3"
              />
              <div className="add-cart">
                  <h4 className="text-2xl my-2 font-[500] px-2">
                      ${price.toFixed(2)}
                  </h4>
                  <button className="cart2" onClick={handleAddToCart}>
                      <FaCartPlus />
                  </button>
              </div>
          </div>
      </div>
  );
}
export default ProductCard