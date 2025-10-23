import { createSlice } from "@reduxjs/toolkit";

const getUserInfoFromStorage =()=>{
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
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
            localStorage.removeItem("userInfo");
        }
    }
});

export const {setUserInfo,logOut}=authSlice.actions;
export default authSlice.reducer;