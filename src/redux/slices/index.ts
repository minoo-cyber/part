import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import toastSlice from "./toastSlice";
import invoiceSlice from "./invoiceSlice";

const rootReducer = combineReducers({
  user: userReducer,
  toast: toastSlice,
  invoice: invoiceSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
