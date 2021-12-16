import { createSlice } from "@reduxjs/toolkit";

export const errorSilce = createSlice({
  name: "error",
  initialState: {
    isError: false,
    errorMessage: false,
  },
  reducers: {},
});
