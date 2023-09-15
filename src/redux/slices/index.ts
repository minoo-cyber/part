import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import toastSlice from "./toastSlice";

const rootReducer = combineReducers({
  user: userReducer,
  toast: toastSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
