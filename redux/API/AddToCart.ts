import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../utils/Constants";

interface IAddToCartResType {
  Status: string;
}

interface IAddToCartDataType {
  productId: string;
  quantity: number;
  timeStamp: number;
}

export const addToCart = createApi({
  reducerPath: "addToCart",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation<IAddToCartResType, IAddToCartDataType>({
      query: (body) => {
        return {
          url: "addcart",
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const { useAddToCartMutation } = addToCart;
