import Rating from "./Rating";
import { Link } from "react-router-dom";

const ProductCard = ({_id,image,name,numReviews,price,rating}) => {
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
              <h4 className="text-2xl my-2 font-[500] px-2">${price.toFixed(2)}</h4>
          </div>
      </div>
  );
}
export default ProductCard