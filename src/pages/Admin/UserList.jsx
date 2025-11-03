import Message from "../../components/Message.jsx";
import { useFetchAllUsers } from "../../hooks/useAuth.js"
import Loader from "../../components/Loader.jsx";
import { FaRegEdit, FaTimes,FaCheck,FaTrash } from "react-icons/fa";
import { useDeleteUser } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";


const UserList = () => {

    const {data:allUsers,isLoading,error}=useFetchAllUsers();

    const {mutate:deleteUser, isPending}=useDeleteUser();

    const navigate=useNavigate();

    const handleUserDelete=(id)=>{
        if(window.confirm("Are you sure you want to delete this product?")){
            deleteUser(id);
            // console.log("user deleted")
        }
    }

    const handleUserEdit = (id) => {
        navigate(`/admin/edit/${id}`);
    };

    if(isLoading) return <Loader />;
    // if(error) return <Message></Message>

  return (
      <div className="admin-list-container">
          <div className="flex justify-between items-center my-4">
              <h1 className="text-4xl font-semibold py-3">UserList</h1>
          </div>
          <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full border border-gray-200">
                  <thead className="uppercase bg-gray-400 p-4">
                      <tr>
                          <th className="text-center p-1">SN</th>
                          <th className="text-center p-1">id</th>
                          <th className="p-2">username</th>
                          <th>email</th>
                          <th>is_Admin</th>
                          <th colSpan={2}>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {allUsers?.map((user, index) => (
                          <tr
                              key={user._id}
                              className="border-b border-gray-300 text-center"
                          >
                              <td className="p-2">{index + 1}</td>
                              <td className="p-2">{user._id}</td>
                              <td className="p-2">{user.username}</td>
                              <td className="p-2 text-center">{user.email}</td>
                              <td className="p-2">
                                  <span className="flex justify-center">
                                      {user.isAdmin ? (
                                          <FaCheck style={{ color: "green" }} />
                                      ) : (
                                          <FaTimes style={{ color: "red" }} />
                                      )}
                                  </span>
                              </td>
                              <td>
                                  <button onClick={()=>handleUserEdit(user._id)}>
                                      <FaRegEdit className="text-blue-500 cursor-pointer text-2xl" />
                                  </button>
                              </td>
                              <td>
                                  <button
                                    onClick={()=>handleUserDelete(user._id)}
                                    disabled={isPending}
                                  >
                                      <FaTrash
                                      className="text-red-500 cursor-pointer text-xl" />
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
};

export default UserList;