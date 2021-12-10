import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userSlice, userSliceReducer } from "../redux/reducers/user";
import { productAPi } from "./API/productAPI";
export const store = configureStore({
  reducer: combineReducers({
    user: userSliceReducer,
    [productAPi.reducerPath]: productAPi.reducer,
  }),
  // default middleware provided by rtk which enable the superpower of refetching the query on internet reconnection
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productAPi.middleware);
  },
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
