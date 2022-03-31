import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../utils/Constants";

interface addToCartResType {
  Status: string;
}

interface addToCartDataType {
  arr: [];
}

export const addToCart = createApi({
  reducerPath: "addToCart",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    addToCart: builder.query<addToCartResType, addToCartDataType>({
      query: (body) => {
        return {
          url: "addtocart",
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const { useLazyAddToCartQuery } = addToCart;
