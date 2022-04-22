import { createSlice } from "@reduxjs/toolkit";

interface IInitialState{
  accessToken : string;
  isLogin: boolean;
  user: any,
}

const initialState: IInitialState = {
  accessToken: '',
  isLogin: false,
  user: {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isLogin = true;
        state.user = action.payload.user;
      },
      logout: (state, action) => {
        state.accessToken ='';
        state.isLogin = false;
        state.user = null;
      }
    }
  });
  
  export const { login, logout } = authSlice.actions;
  
  export default authSlice.reducer;