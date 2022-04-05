import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../utils/Constants";

export const getProductByID = createApi({
  reducerPath: "productByID",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getProductByID: builder.query<any, any>({
      query: (id) => {
        return {
          url: id,
          method: "GET",
        };
      },
    }),
  }),
});
export const { useGetProductByIDQuery } = getProductByID;
