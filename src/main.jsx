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
// import Login2 from './pages/Login2.jsx';






const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" index={true} element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new" element={<NewProduct />} />
            <Route path="/signup" element={<SignUp />} />
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
