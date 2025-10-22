import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";

import { userRegistration,fetchCurrentUser, logOutUser,loginUser,fetchUserProfile, updateUserProfile } from "../apiCall/dataFetch.js";
import { toast } from "react-toastify";

export const useCurrentUser=()=>{
    return useQuery({
        queryKey:["currentUser"],
        queryFn:fetchCurrentUser,
        staleTime:5*60*1000, // 5 minutes
        retry:0,
        enabled:true,
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
    return useMutation({
        mutationKey:["logoutUser"],
        mutationFn: logOutUser,
        onSuccess:()=>{
            // localStorage.removeItem("userInfo")
            queryClient.removeQueries(["currentUser"]);
            toast.success("Logged out successfully")
        },
        onError:(err)=>{
            toast.error(err?.response?.data?.message || err.message)
        }
    })
}

export const useLogin=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationKey:["loginUser"],
        mutationFn:loginUser,
        onSuccess:(data)=>{
            // Refetch current user after login
            queryClient.invalidateQueries(["currentUser"],data);
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
            queryClient.invalidateQueries(["currentUser"]);
            toast.success("Update user successfully!");
        },
        onError:(err)=>{
            toast.error(err?.response?.data?.message || err.message);
        }
    })
}