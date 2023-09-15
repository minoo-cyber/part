import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import {AlertColor} from "@mui/material";

export interface ToastState {
    open: boolean;
    text: string;
    type: AlertColor;
}

const initialState: ToastState = {
    open: false,
    text: "",
    type: "info",
};

export const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        setToast: (
            state,
            action: PayloadAction<{ open: boolean; text: string; type: AlertColor }>
        ) => {
            state.open = action.payload.open;
            state.text = action.payload.text;
            state.type = action.payload.type;
        },
    },
});

export const {setToast} = toastSlice.actions;

export default toastSlice.reducer;
