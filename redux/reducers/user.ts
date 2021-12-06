import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../interfaces/UserType";
import { signupUser } from "../services/UserLogin.service";
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
    },
  },
  extraReducers: {
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
      state.errorMessage = payload.message;
    },
    // [loginUser.fulfilled]: (state, { payload }) => {
    //   state.email = payload.email;
    //   state.username = payload.name;
    //   state.isFetching = false;
    //   state.isSuccess = true;
    //   return state;
    // },
    // [loginUser.rejected]: (state, { payload }) => {
    //   console.log("payload", payload);
    //   state.isFetching = false;
    //   state.isError = true;
    //   state.errorMessage = payload.message;
    // },
    // [loginUser.pending]: (state) => {
    //   state.isFetching = true;
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
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state: RootState) => state.username;

export const userSliceReducer = userSlice.reducer;
