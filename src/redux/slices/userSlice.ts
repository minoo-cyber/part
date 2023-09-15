import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  token?: string;
  refresh?: string;
}

const initialState: UserState = {
  token: "",
  refresh: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userToken: (
      state,
      action: PayloadAction<{ token: string; refresh: string }>
    ) => {
      state.refresh = action.payload.refresh;
      state.token = action.payload.token;
    },
    clearUserToken: (state) => {
      state.refresh = "";
      state.token = "";
    },
  },
});

export const { userToken, clearUserToken } = userSlice.actions;

export default userSlice.reducer;
