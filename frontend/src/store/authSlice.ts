import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  token: string | null;
  loginTime: number | null;
}

const initialState: AuthState = {
  user: null, 
  token: null,
  loginTime: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; [key: string]: any }>) => {
      const { token, ...userInfo } = action.payload;
      state.user = userInfo;
      state.token = token;
      state.loginTime = Date.now();
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loginTime = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;