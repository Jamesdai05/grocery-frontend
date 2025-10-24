import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = () => {
    const userInfo=useSelector(state=>state.auth);

    if(!userInfo || userInfo === null){
        return <Navigate to="/login" replace={true} />
    }
  return <Outlet />;
}
export default PrivateRoute