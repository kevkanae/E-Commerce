import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../utils/constant";

export const getCart = createApi({
  reducerPath: "getCart",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getCart: builder.query<any, any>({
      query: (body) => {
        return {
          url: "getCart",
          method: "GET",
          body: body,
        };
      },
    }),
  }),
});

export const { useGetCartQuery } = getCart;
