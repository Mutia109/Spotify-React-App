import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      accessToken: '',
      isLogin: false,
    },
    reducers: {
      login: (state, action) => {
        state.accessToken = action.payload;
        state.isLogin = true;
      }
    }
  });
  
  export const { login } = authSlice.actions;
  
  export default authSlice.reducer;