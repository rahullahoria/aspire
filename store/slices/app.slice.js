
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isLoadingIndicatorDisplayed: false,       
    loadingIndicatorText: "",                  
    appColorSolid: "#01D167",                   
};




export const app = createSlice({
    name: 'app',    
    initialState,
    reducers: {
        setIsLoadingIndicatorDisplayed: (state, action) => {
            state.isLoadingIndicatorDisplayed = action.payload.isLoadingIndicatorDisplayed;
        },
        setLoadingIndicatorText: (state, action) => {
            state.loadingIndicatorText = action.payload.loadingIndicatorText;
        },
        setAppColorSolid: (state, action) => {
            state.appColorSolid = action.payload.appColorSolid;
        },
     }
});


export const { setIsLoadingIndicatorDisplayed, setLoadingIndicatorText, setAppColorSolid} = app.actions;

//Selectors -> Creating individual selector for every item
//Used to select/pull the data
export const selectIsLoadingIndicatorDisplayed = (state) => state.appVariable.isLoadingIndicatorDisplayed;
export const selectLoadingIndicatorText = (state) => state.appVariable.loadingIndicatorText;
export const selectAppColorSolid = (state) => state.appVariable.appColorSolid;


export default app.reducer;    //Export this by default to whichever file imports it first.