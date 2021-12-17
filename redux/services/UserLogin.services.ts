import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginResp } from "../../interfaces/UserType";
import { BASE_URL } from "../../utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

interface inputData {
  email: string;
  password: string;
}
// export const loginUser = createApi({
//   reducerPath: "user",
//   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
//   endpoints: (builder) => ({
//     getUserLoggedIn: builder.query<loginResp, inputData>({
//       query: (data) => {
//         var formdata = new FormData();
//         formdata.append("email", data.email);
//         formdata.append("password", data.password);
//         return {
//           url: "/login",
//           method: "POST",
//           body: formdata,
//         };
//       },
//     }),
//   }),
// });
// export const { useGetUserLoggedInQuery } = loginUser;
// export const signupUser = createAsyncThunk(
//   "users/signupUser",
//   async ({ email, password }: Partial<User>, thunkAPI) => {
//     try {
//       const response = await fetch(BASE_URL + "register", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });
//       let data = await response.json();
//       console.log("data", data);

//       if (response.status === 200) {
//         localStorage.setItem("token", data.token);
//         return { ...data, username: name, email: email };
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e: any) {
//       console.log("Error", e.response.data);
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );
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
