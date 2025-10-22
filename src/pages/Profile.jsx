import { useUserProfile, useUpdateUserProfile } from '../hooks/useAuth';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { toast } from 'react-toastify';
import {useState, useEffect} from "react";




const Profile = () => {

    const [formData,setFormData]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    const {data:user,isLoading,error}=useUserProfile();
    const {mutate:updateUser,isPending,error:updateUserError}=useUpdateUserProfile();

    // console.log(user)
    useEffect(()=>{
        if(user){
            setFormData({
                username:user.username || "",
                email:user.email || "",
                password:"",
                confirmPassword:"",
            })
        }
    },[user])

    const {username,email,password,confirmPassword}=formData;

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData(prev=>{
            return {
                ...prev,
                [name]:value,
            }
        })
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            return toast.error("Passwords do not match")
        }

        if(password && password.length < 6){
            return toast.error("Password must be at least 6 characters")
        }
        updateUser(formData,{
            onSuccess:()=>{
                toast.success("User update sucessfully!")
            },
            onError:(err)=>{
                toast.error(err?.response?.data?.message || err.message || "Failed to update user")
            }
        })
    }


    if(isLoading){
        return <Loader />
    }

    return (
        <div className="container flex flex-col md:flex-row gap-6 mx-auto p-2 border-amber-100">
            <div className="md:w-4/12 w-full">
                {error && (
                    <Message type="error">Error: {error.message}</Message>
                )}
                <form
                    action=""
                    className="form-container"
                    onSubmit={handleSubmit}
                >
                    <div className="form-control">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter username"
                            className="form-input"
                            value={username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="form-input"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter the password"
                            className="form-input"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirm password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Enter the password"
                            className="form-input"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profile-btn">
                        <button type="submit" className="btn-primary btn">
                            {isPending ? "Updat..." : "Update"}
                        </button>
                    </div>
                    {updateUserError && <Message type="error">{updateUserError?.response?.data?.message || "Failed to update user"}</Message>}
                </form>
            </div>
            <div className="md:w-8/12 w-full">
                <h1 className="text-2xl font-bold">My Orders</h1>
            </div>
        </div>
    );
}
export default Profile