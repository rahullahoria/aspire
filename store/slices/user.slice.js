
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: null,       
    userId: null,               
};




export const user = createSlice({
    name: 'user',   
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload.userName;
        },
        setUserId: (state, action) => {
            state.userId = action.payload.userId;
        }     
    }
});


export const { setUserName, setUserId} = user.actions;


export const selectUserName = (state) => state.user.userName;
export const selectUserId = (state) => state.user.userId;


export default user.reducer;   