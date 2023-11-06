import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AddTaskSlice {
  taskData: any;
}

const initialState: AddTaskSlice = {
  taskData: [],
};

export const addTaskSlice = createSlice({
  name: "addTaskSlice",
  initialState,
  reducers: {
    setTaskData: (state, action: PayloadAction) => {
      if (state.taskData) {
        state.taskData.push(action.payload);
      } else {
        state.taskData = [action.payload];
      }
    },
    setEditTask: (state, action) => {
      state.taskData[action.payload.selectedId] = action.payload.task;
    },
    setTaskDone: (state, action: PayloadAction) => {
      state.taskData = state.taskData.filter(
        (task: any) => task.id !== action.payload
      );
    },
  },
});

export const { setTaskData, setTaskDone, setEditTask } = addTaskSlice.actions;

export default addTaskSlice.reducer;
