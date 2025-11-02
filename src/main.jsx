import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Menu from "./pages/Menu.jsx";
import Login from "./pages/Login.jsx";
import NewProduct from './pages/NewProduct.jsx';
import SignUp from './pages/SignUp.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Profile from './pages/Profile.jsx';
import CheckoutA from './pages/CheckoutA.jsx';
import CartPage from './pages/CartPage.jsx';
import ShippingInfo from './pages/ShippingInfo.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import PrivateRoute from './components/PrivateRoute';
import Checkout from './pages/Checkout.jsx';
import AdminRoute from './components/AdminRoute';
import OrderPage from './pages/OrderPage.jsx';
import ProductEdit from './pages/Admin/ProductEdit.jsx';
import UserEdit from './pages/UserEdit.jsx';
import NotFound from './pages/NotFound.jsx';
import Productlist from './pages/Admin/Productlist.jsx'
import Orderlist from './pages/Admin/Orderlist.jsx';
import UserList from './pages/Admin/UserList';







const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" index={true} element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="" element={<PrivateRoute />}>
                <Route path="/Profile" element={<Profile />} />
                <Route path="/placeOrder" element={<PlaceOrder />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/shipping" element={<ShippingInfo />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout-a" element={<CheckoutA />} />
                <Route path="/orders/:id" element={<OrderPage />} />
            </Route>

            <Route path="/" element={<AdminRoute />}>
                <Route path="/admin/new" element={<NewProduct />} />
                <Route path="/admin/orderlist" element={<Orderlist />} />
                <Route path="/admin/users/:id/edit" element={<UserEdit />} />
                <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
                <Route path="/admin/productlist" element={<Productlist />} />
                <Route path="/admin/product/new" element={<NewProduct />} />
                <Route path="/admin/userlist" element={<UserList />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
