import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../utils/Constants";
import { IProduct } from "../../interfaces/Product";

export const productAPi = createApi({
  reducerPath: "products",
  // basequery can be configured to set header for token and some other things
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: (builder) => ({
    // reducer created by createAPI
    // takes input the query data process and manages the results state on ots own
    getProducts: builder.query<Array<IProduct>, any>({
      query: () => {
        return {
          url: "products",
          method: "GET",
        };
      },
      // transformResponse: (response: { data: IProduct[] }) => response.data,
    }),
  }),
});

// is returned by rtk query createAPI method which is basically a Hook.
export const { useGetProductsQuery } = productAPi;
