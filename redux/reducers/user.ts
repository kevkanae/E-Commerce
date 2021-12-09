import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../interfaces/UserType";
// import { signupUser } from "../services/UserSignIn.service";
import { loginUser } from "../services/UserLogin.service";
import type { RootState } from "../Store";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
      // },
    },
  },
  extraReducers: {
    [loginUser.fulfilled as any]: (state: any, { payload }: any) => {
      state.email = payload.email;
      // state.username = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected as any]: (state: any, { payload }: any) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      // state.errorMessage = payload.message;
    },
    [loginUser.pending as any]: (state: any) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export const userSliceReducer = userSlice.reducer;
// [signupUser.fulfilled as any]: (state, { payload }) => {
//   console.log("payload", payload);
//   state.isFetching = false;
//   state.isSuccess = true;
//   state.email = payload.user.email;
//   state.username = payload.user.name;
// },
// [signupUser.pending as any]: (state) => {
//   state.isFetching = true;
// },
// [signupUser.rejected as any]: (state, { payload }) => {
//   state.isFetching = false;
//   state.isError = true;
//   state.errorMessage = payload.message;
// },

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
