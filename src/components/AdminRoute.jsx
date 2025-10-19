import { Outlet,Navigate } from "react-router-dom"
import { useCurrentUser } from "../hooks/useAuth.js";



const AdminRoute = () => {
    const {data:user,isLoading}=useCurrentUser();

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!user || user.role !== "admin"){
        return <Navigate to="/login" replace={true} />
    }
    return <Outlet />;
}
export default AdminRoute