import { createSlice } from "@reduxjs/toolkit";

// let userInfromStorage;
const getUserInfoFromStorage=()=>{
    try{
        const userInfoFromStorage=localStorage.getItem("userInfo");
        return userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null;
    }catch(err){
        console.error("Error parsing userInfo from localStorage:",err);
        localStorage.removeItem("userInfo");
        return null;
    }
}


const initialState = {
    userInfo: getUserInfoFromStorage(),
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            state.userInfo=action.payload;
            localStorage.setItem("userInfo",JSON.stringify(action.payload));
        },
        logOut:(state)=>{
            state.userInfo=null;
            localStorage.clear();
        }
    }
});

export const {setUserInfo,logOut}=authSlice.actions;
export default authSlice.reducer;