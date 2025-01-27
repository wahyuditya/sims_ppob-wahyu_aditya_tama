import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  balance: number | null;
  user: {
    firstName: string;
    lastName: string;
    profilePhoto: string;
  } | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  balance: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        user?: any;
        balance?: number;
        services?: any;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user || null;
      state.balance = action.payload.balance || null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.balance = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
