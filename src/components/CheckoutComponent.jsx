import {Link} from "react-router-dom";

const CheckoutComponent = ({step1,step2,step3,step4}) => {
  return (
    <div className="flex justify-center mb-6 space-x-6 text-sm md:text-base">
        {/* Step 1: Sign In */}
        <div className="flex flex-col items-center">
            {step1 ? (
                <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                >
                    Sign In
                </Link>
            ) : (
                <span className="text-gray-400 font-medium">Sign In</span>
            )}
            <div
                className={`w-3 h-3 rounded-full mt-1 ${
                    step1 ? "bg-blue-600" : "bg-gray-300"
                }`}
            />
        </div>

        {/* Arrow Separator */}
        <div className="flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </div>

        {/* Step 2: Shipping */}
        <div className="flex flex-col items-center">
            {step2 ? (
                <Link
                    to="/shipping"
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                >
                    Shipping
                </Link>
            ) : (
                <span className="text-gray-400 font-medium">Shipping</span>
            )}
            <div
                className={`w-3 h-3 rounded-full mt-1 ${
                    step2 ? "bg-blue-600" : "bg-gray-300"
                }`}
            />
        </div>

        {/* Arrow Separator */}
        <div className="flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </div>

        {/* Step 3: Payment */}
        <div className="flex flex-col items-center">
            {step3 ? (
                <Link
                    to="/payment"
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                >
                    Payment
                </Link>
            ) : (
                <span className="text-gray-400 font-medium">Payment</span>
            )}
            <div
                className={`w-3 h-3 rounded-full mt-1 ${
                    step3 ? "bg-blue-600" : "bg-gray-300"
                }`}
            />
        </div>

        {/* Arrow Separator */}
        <div className="flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </div>

        {/* Step 4: Place Order */}
        <div className="flex flex-col items-center">
            {step4 ? (
                <Link
                    to="/placeorder"
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                >
                    Place Order
                </Link>
            ) : (
                <span className="text-gray-400 font-medium">Place Order</span>
            )}
            <div
                className={`w-3 h-3 rounded-full mt-1 ${
                    step4 ? "bg-blue-600" : "bg-gray-300"
                }`}
            />
        </div>
    </div>
  );
}
export default CheckoutComponent