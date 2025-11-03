import { useState } from "react";
import { useUpdateUserByAdmin } from "../../hooks/useAuth.js";
import { Link } from "react-router-dom";
import FormContainer from "../../components/FormContainer.jsx";

const UserEdit = () => {

    const [formData,setFormData]=useState({
        username:"",
        email:"",
        isAdmin:false,
    })

    const {mutate:editUser,isPending,error}=useUpdateUserByAdmin()

    const handleCheck=(e)=>{
        setFormData(prev=>{
            return {
                ...prev,
                isAdmin:!prev.isAdmin,
            }
        })
    }

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
        console.log(formData);
    }

    // const handleChange=(e)=>{
    //     const {name,value}=e.target;
    //     setFormData(prev=>{
    //         return {
    //             ...prev,
    //             [name]:value,
    //         }
    //     })
    // }


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
                  />
              </div>
              <div className="form-control2">
                  <label htmlFor="isAdmin">IsAdmin:</label>
                  <input
                      //   type="checkbox"
                      value={formData.isAdmin}
                      className="form-input2"
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