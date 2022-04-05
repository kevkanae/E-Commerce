import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userSliceReducer } from "./reducers/AuthUser";
import { addToCart } from "./API/AddToCart";
import { productAPI } from "./API/GetProducts";
import { getProductByID } from "./API/GetProductByID";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [addToCart.reducerPath]: addToCart.reducer,
    [getProductByID.reducerPath]: getProductByID.reducer,
  },
  // default middleware provided by rtk which enable the superpower of refetching the query on internet reconnection
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      productAPI.middleware,
      addToCart.middleware,
      getProductByID.middleware
      // rtkQueryErrorLogger
    );
  },
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
