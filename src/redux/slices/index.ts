import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import toastSlice from "./toastSlice";
import invoiceSlice from "./invoiceSlice";
import pendingSlice from "./pendingSlice";

const rootReducer = combineReducers({
  user: userReducer,
  toast: toastSlice,
  invoice: invoiceSlice,
  pending: pendingSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
