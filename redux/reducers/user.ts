import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../interfaces/UserType";
import { loginUser } from "../services/UserLogin.service";
import { signupUser } from "../services/UserSignIn.service";
import type { RootState } from "../Store";

interface initials {
  username: string;
  email: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}
const initialState: initials = {
  username: "",
  email: "",
  isFetching: false,
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
  },
  extraReducers: {
    [loginUser.fulfilled as any]: (state: any, { payload }: any) => {
      state.email = payload.email;
      state.username = payload.Username;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected as any]: (state: any, { payload }: any) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.Status;
    },
    [loginUser.pending as any]: (state: any) => {
      state.isFetching = true;
    },
    [signupUser.fulfilled as any]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
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

export const { clearState } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export const userSliceReducer = userSlice.reducer;

// [fetchUserBytoken.pending]: (state) => {
//   state.isFetching = true;
// },
// [fetchUserBytoken.fulfilled]: (state, { payload }) => {
//   state.isFetching = false;
//   state.isSuccess = true;
//   state.email = payload.email;
//   state.username = payload.name;
// },
// [fetchUserBytoken.rejected]: (state) => {
//   console.log("fetchUserBytoken");
//   state.isFetching = false;
//   state.isError = true;
// },
