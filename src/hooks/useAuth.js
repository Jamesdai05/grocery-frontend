import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";

import { userRegistration,fetchCurrentUser, logOutUser,loginUser,fetchUserProfile, updateUserProfile } from "../apiCall/dataFetch.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logOut,setUserInfo} from "../store/authSlice.js";
import { resetCart } from "../store/cartSlice.js";



export const useCurrentUser=()=>{
    return useQuery({
        queryKey:["currentUser"],
        queryFn:fetchCurrentUser,
        staleTime:5*60*1000, // 5 minutes
        retry:0,
        enabled:true,
        refetchOnWindowFocus: false, // disable refetch on window focus
    })
}

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userRegistration,
    onSuccess: async (data) => {
      // Refetch current user after registration (auto-login)
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

export const useLogin=()=>{
    const queryClient=useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationKey:["loginUser"],
        mutationFn:loginUser,
        onSuccess:(data)=>{
            // Refetch current user after login
            dispatch(setUserInfo(data));
            queryClient.setQueryData(["currentUser"],data);
            // localStorage.setItem("userInfo",JSON.stringify(data));
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