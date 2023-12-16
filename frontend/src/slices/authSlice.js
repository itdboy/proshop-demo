import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //ถ้ามี userInfo ใน localStorage เราจะใช้จาก localStorage แต่ถ้าไม่ก็จะส่งค่า null
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo')): null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials:(state, action)=>{
            //เป็นการ set state userInfo to action payload
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));

        },
        logout:(state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;