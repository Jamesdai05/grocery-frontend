import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/header/Header';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';


function App() {
    const queryClient=new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <Header />
                <Outlet />
                <ToastContainer />
            </div>
        </QueryClientProvider>
    );
}

export default App
