import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/header/Header.jsx';


function App() {


  return (
    <div className='app'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
