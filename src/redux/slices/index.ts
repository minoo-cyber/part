import { combineReducers } from "@reduxjs/toolkit";
import addTaskSlice from "./addTaskSlice";
import doneTaskSlice from "./doneTaskSlice";
import toastSlice from "./toastSlice";

const rootReducer = combineReducers({
  toast: toastSlice,
  addTask: addTaskSlice,
  doneTask: doneTaskSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
