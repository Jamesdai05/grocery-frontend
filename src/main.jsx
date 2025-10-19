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
import About from './pages/About.jsx';
import CartPage from './pages/CartPage.jsx';
import ShippingInfo from './pages/ShippingInfo.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import PrivateRoute from './components/PrivateRoute';
// import Login2 from './pages/Login2.jsx';
import AdminRoute from './components/AdminRoute';






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
            </Route>

            <Route path="" element={<AdminRoute />}>
                <Route path="/new" element={<NewProduct />} />
            </Route>
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
