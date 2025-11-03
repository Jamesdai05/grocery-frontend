import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";

import {
    userRegistration,
    logOutUser,
    loginUser,
    fetchUserProfile,
    updateUserProfile,
    fetchAllUsers,
    deleteUserById,
    editUserByAdmin
 } from "../apiCall/dataFetch.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logOut,setUserInfo} from "../Slices/authSlice.js";
import { resetCart } from "../Slices/cartSlice.js";



// export const useCurrentUser=()=>{
//     return useQuery({
//         queryKey:["currentUser"],
//         queryFn:fetchCurrentUser,
//         staleTime:5*60*1000, // 5 minutes
//         retry:0,
//         enabled:true,
//         refetchOnWindowFocus: false, // disable refetch on window focus
//     })
// }

export const useRegister = () => {
  const queryClient = useQueryClient();
  const dispatch=useDispatch();
  return useMutation({
    mutationFn: userRegistration,
    onSuccess: async (data) => {
      // Refetch current user after registration (auto-login)
      dispatch(setUserInfo(data))
      await queryClient.invalidateQueries(["currentUser"]);
      toast.success("Registration successful!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    }
  });
};

export const useLogOut=()=>{
    const queryClient=useQueryClient();
    const dispatch=useDispatch();
    return useMutation({
        mutationKey:["logoutUser"],
        mutationFn: logOutUser,
        onSuccess:()=>{
            dispatch(logOut());
            dispatch(resetCart());
            queryClient.clear();
            localStorage.clear();
            toast.success("Logged out successfully")
        },
        onError:(err)=>{
            toast.error(err?.response?.data?.message || err.message)
        }
    })
}

// for the redux it will only handle the state management and localstorage.
// for tanstack query it will handle the data from api call.
export const useLogin=()=>{
    const queryClient=useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationKey:["loginUser"],
        mutationFn:loginUser,
        onSuccess:(data)=>{
            // Refetch current user after login
            // console.log("login data:",data);
            dispatch(setUserInfo(data));  //handle the redux state and localstorage.
            queryClient.setQueryData(["currentUser"],data);
            toast.success("Login successful!");
        },
        onError:(err)=>{
            toast.error(err?.response?.data?.message || err.message)
        }
    });
}

export const useUserProfile=()=>{
    return useQuery({
        queryKey:["profile"],
        queryFn:fetchUserProfile,
        // enabled:!!userId,
        staleTime:5*60*1000,
        retry:1,
    })
}

export const useUpdateUserProfile=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationKey:["updateUser"],
        mutationFn:updateUserProfile,
        onSuccess:(data)=>{
            queryClient.setQueryData(["currentUser"],data);
            queryClient.setQueryData(["profile"],data);
            toast.success("Update user successfully!");
        },
        onError:(err)=>{
            toast.error(err?.response?.data?.message || err.message);
        }
    })
}

export const useFetchAllUsers=()=>{
    return useQuery({
        queryKey:["users"],
        queryFn:fetchAllUsers,
        onSuccess:(data)=>{
            console.log("All users are:",data);
        },

        onError:(e)=>{
            console.error("Error fetching users:",e);
            toast.error("Failed to fetch users");
        }
    })
}


export const useDeleteUser=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationKey:["deleteUser"],
        mutationFn:(id)=>deleteUserById(id),
        onSuccess:()=>{
            toast.success("User deleted!");
            queryClient.invalidateQueries(["users"]);
        },

        onError:(err)=>{
            toast.error(err?.response?.data?.message || err.message);
            console.error("Error deleting user:",err);
        }

    })
}

export const useUpdateUserByAdmin=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationKey:["updateUserByAdmin"],
        mutationFn:(id)=>editUserByAdmin(id),
        onSuccess:()=>{
            toast.success("User updated successfully!");
            queryClient.invalidateQueries(["users"]);
        },
        onError:(err)=>{
            toast.error(err?.response?.data?.message || err.message);
            console.error("Error updating user:",err);
        }

    })
}