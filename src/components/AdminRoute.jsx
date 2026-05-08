import { Outlet,Navigate } from "react-router-dom"
import { useSelector } from "react-redux";



const AdminRoute = () => {
    const user=useSelector(state=>state.auth.userInfo);

    // console.log(user);

    if(!user){
        return <Navigate to="/login" replace={true} />
    }
    if(!user.isAdmin){
        return <Navigate to="/" replace={true}/>
    }
    return <Outlet />;
}
export default AdminRoute