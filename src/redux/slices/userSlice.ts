import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  token?: string;
  refresh?: string;
  user?: string;
}

const initialState: UserState = {
  token: "",
  refresh: "",
  user: "",
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
    userInfo: (state, action: PayloadAction<{ user: string }>) => {
      state.user = action.payload.user;
    },
    clearUserToken: (state) => {
      state.refresh = "";
      state.token = "";
    },
  },
});

export const { userToken, clearUserToken, userInfo } = userSlice.actions;

export default userSlice.reducer;
