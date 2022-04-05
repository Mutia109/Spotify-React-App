import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authRedux";

export default configureStore({
    reducer:{
        auth: authReducer,
    }

});