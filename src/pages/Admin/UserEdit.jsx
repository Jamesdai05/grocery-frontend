import { useState,useEffect } from "react";
import { useGetUserDetails, useUpdateUserByAdmin } from "../../hooks/useAuth.js";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer.jsx";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader.jsx";


const UserEdit = () => {
    const { id: userId } = useParams();

    const navigate=useNavigate();

    const { data, isLoading } = useGetUserDetails(userId);

    console.log(data);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        isAdmin: false,
    });

    // 🧩 Update form data when API data is fetched
    useEffect(() => {
        if (data) {
            setFormData({
                username: data.username || "",
                email: data.email || "",
                isAdmin: data.isAdmin || false,
            });
        }
    }, [data]);

    const {
        mutate: editUser,
        isPending,
        error,
    } = useUpdateUserByAdmin(userId, formData);

    const handleCheck = () => {
        setFormData((prev) => {
            return {
                ...prev,
                isAdmin: !prev.isAdmin,
            };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        editUser({userId,userData:formData});
        setTimeout(()=>{
            navigate("/admin/userlist")

        },1000)
    };

    if (isLoading) return <Loader />;

    // if(error)return <Message type="error">{error?.response?.data?.error}</Message>

    return (
        <FormContainer>
            <div className="mb-4">
                <Link className="btn " to={`/admin/userlist`}>
                    Go Back
                </Link>
            </div>
            <form className="form-container max-w-6xl" onSubmit={handleSubmit}>
                <div className="form-control2">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        value={formData.username}
                        className="form-input2"
                        name="username"
                        id="username"
                        placeholder="Enter usernamename"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-control2">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        value={formData.email}
                        className="form-input2"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="isAdmin">IsAdmin:</label>
                    <input
                        type="checkbox"
                        checked={formData.isAdmin}
                        className="ms-1 inline-block"
                        name="isAdmin"
                        id="isAdmin"
                        placeholder="Enter price"
                        onChange={handleCheck}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="btn-primary btn"
                        disabled={isPending}
                    >
                        {isPending ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </FormContainer>
    );
}
export default UserEdit