import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/header/Header';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {


  return (
    <div className='app'>
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  )
}

export default App
