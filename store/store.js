import { configureStore } from "@reduxjs/toolkit";
import debitCardReducer from "./slices/debitCard.slice";
import userReducer from "./slices/user.slice";
import appReducer from "./slices/app.slice";

export const store = configureStore({
    reducer: {
        debitCard: debitCardReducer,
        user: userReducer,
        appVariable: appReducer,
    },
});