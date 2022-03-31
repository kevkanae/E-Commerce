import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../services/user/Login.services";
import { signupUser } from "../services/user/SignIn.services";
import type { RootState } from "../Store";

interface initials {
  username: string;
  email: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isAuthenticated: boolean;
  errorMessage: string;
}

const isAuth = async () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("isAuth");
    return item;
  }
};
const initialState: initials = {
  username: "",
  email: "",
  isFetching: false,
  isAuthenticated: Boolean(isAuth()),
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    userLogOut: (state) => {
      localStorage.setItem("isAuth", "false");
      state.isAuthenticated = false;
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    // ...productAPi.reducer,
  },

  extraReducers: {
    [loginUser.fulfilled as any]: (state: any, { payload }: any) => {
      state.email = payload.email;
      state.username = payload.Username;
      state.isAuthenticated = payload.isAuthenticated;
      localStorage.setItem("isAuth", "true");
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected as any]: (state: any, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.isAuthenticated = false;
    },
    [loginUser.pending as any]: (state: any) => {
      state.isFetching = true;
    },
    [signupUser.fulfilled as any]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isAuthenticated = payload.isAuthenticated;
      state.isSuccess = true;
      state.email = payload.user.email;
      state.username = payload.user.name;
    },
    [signupUser.pending as any]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected as any]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.Status;
    },
  },
});

export const { clearState, userLogOut } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export const userSliceReducer = userSlice.reducer;
