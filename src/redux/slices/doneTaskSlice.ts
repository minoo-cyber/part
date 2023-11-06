import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface DoneTaskSlice {
  doneData: any;
}

const initialState: DoneTaskSlice = {
  doneData: [],
};

export const doneTaskSlice = createSlice({
  name: "doneTaskSlice",
  initialState,
  reducers: {
    setTaskDataList: (state, action: PayloadAction) => {
      if (state.doneData) {
        state.doneData.push(action.payload);
      } else {
        state.doneData = [action.payload];
      }
    },
    setTaskClearData: (state) => {
      state.doneData = [];
    },
  },
});

export const { setTaskDataList, setTaskClearData } = doneTaskSlice.actions;

export default doneTaskSlice.reducer;
