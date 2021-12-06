import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice, userSliceReducer } from "../redux/reducers/user";
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
