import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../utils/constant";
import { ProductType } from "../../interfaces/Products";
import { RootState } from "../Store";
export const productAPi = createApi({
  reducerPath: "products",
  // basequery can be configured to set header for token and some other things
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // mode:""
    // prepareHeaders: (headers: Headers, { getState }) => {
    //   const token = localStorage.getItem("token");
    //   if (token !== null) headers.set("Authorization", `Bearer ${token}`);
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    // reducer created by createAPI
    // takes input the query data process and manages the results state on ots own
    getProducts: builder.query<Array<ProductType>, any>({
      query: () => {
        return {
          url: "products",
          method: "GET",
        };
      },
    }),
  }),
});

// is returned by rtk query createAPI method which is basically a Hook.
export const { useGetProductsQuery } = productAPi;
