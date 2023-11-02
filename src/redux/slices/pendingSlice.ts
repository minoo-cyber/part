import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface PendingSlice {
  pendingData: any;
}

const initialState: PendingSlice = {
  pendingData: [],
};

export const pendingSlice = createSlice({
  name: "pendingSlice",
  initialState,
  reducers: {
    setPendingSubData: (state, action: PayloadAction) => {
      state.pendingData = action.payload;
    },
    setPendingEdit: (state, action: PayloadAction) => {
      state.pendingData = Object.assign(state.pendingData, action.payload);
    },
  },
});

export const { setPendingSubData, setPendingEdit } = pendingSlice.actions;

export default pendingSlice.reducer;
