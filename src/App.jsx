import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/header/Header';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/index.js';


function App() {
    const queryClient=new QueryClient()

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <div className="app">
                    <Header />
                    <Outlet />
                    <ToastContainer />
                </div>
            </QueryClientProvider>
        </Provider>
    );
}

export default App
