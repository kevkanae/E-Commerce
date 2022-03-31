import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../utils/Constants";
import axios from "axios";

interface inputData {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }: inputData, thunkAPI) => {
    try {
      var formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);
      const response = await axios.post(BASE_URL + "login", formdata);
      let data = await response.data;
      console.log("response", data);
      if (response.status === 200 && data.Status === "Login Success") {
        localStorage.setItem("token", data.Token);
        return {
          ...data,
          Username: response.data.Username,
          email: email,
          isAuthenticated: true,
        };
      } else {
        console.log(data);
        return thunkAPI.rejectWithValue({
          ...data,
          statusCode: response.status,
        });
      }
    } catch (e: any) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// export const fetchUserBytoken = createAsyncThunk(
//   "users/fetchUserByToken",
//   async ({ token }, thunkAPI) => {
//     try {
//       const response = await fetch(
//         "https://mock-user-auth-server.herokuapp.com/api/v1/users",
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       let data = await response.json();
//       console.log("data", data, response.status);

//       if (response.status === 200) {
//         return { ...data };
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e) {
//       console.log("Error", e.response.data);
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );
