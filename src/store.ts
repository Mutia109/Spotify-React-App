import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authRedux";

const store = configureStore({
    reducer:{
        auth: authReducer,
    }

});
export type TRootState = ReturnType<typeof store.getState>

export default store;