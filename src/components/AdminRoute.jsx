import { Outlet,Navigate } from "react-router-dom"
import { useSelector } from "react-redux";



const AdminRoute = () => {
    const user=useSelector(state=>state.auth);



    if(!user || user.role !== "admin"){
        return <Navigate to="/login" replace={true} />
    }
    return <Outlet />;
}
export default AdminRoute