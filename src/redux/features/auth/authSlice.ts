import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  role: "ADMIN" | "TEACHER" | "STUDENT" | "PARENT" | "SUPPORT_STAFF";
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
}

const getInitialState = (): AuthState => {
  if (typeof window === "undefined") return { user: null, accessToken: null };
  const token = localStorage.getItem("accessToken");
  const userStr = localStorage.getItem("user");
  return {
    user: userStr ? JSON.parse(userStr) : null,
    accessToken: token || null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: AuthUser; token: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
