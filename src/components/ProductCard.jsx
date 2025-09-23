import Rating from "./Rating";

const ProductCard = ({image,name,numReviews,price,rating}) => {
  return (
      <div className="product bg-gray-100 border-2 rounded border-gray-300">
          <div className="image">
              <img
                  src={image}
                  className="h-[15rem] object-contain"
              />
          </div>
          <div className="info px-2">
              <h3 className="title text-blue-500 bold">{name}</h3>
              <Rating
                  value={rating}
                  text={`${numReviews} Reviews`}
                  className="mb-3"
              />
          </div>
      </div>
  );
}
export default ProductCard