import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from "@reduxjs/toolkit";
import { toast, ToastMessage } from "@chakra-ui/react";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
    if (isRejectedWithValue(action)) {
      // manually define every kind of errorr

      console.warn("We got a rejected action!", action.error.statusCode);
      //   toast.warn({ title: "Async error!", message: action.error.data.message });
      const message: ToastMessage = action.error.statusCode;
      toast.notify(message);
    }

    return next(action);
  };
