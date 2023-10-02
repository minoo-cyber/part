import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface InvoiceSlice {
  data: any;
}

const initialState: InvoiceSlice = {
  data: [],
};

export const invoiceSlice = createSlice({
  name: "invoiceSlice",
  initialState,
  reducers: {
    setInvoiceData: (state, action: PayloadAction) => {
      state.data = action.payload;
    },
    setInvoiceInfoDSelect: (state, action: PayloadAction) => {
      state.data = Object.assign(state.data, action.payload);
    },
    setInvoiceClearData: (state) => {
      state.data = [];
    },
  },
});

export const { setInvoiceData, setInvoiceInfoDSelect, setInvoiceClearData } =
  invoiceSlice.actions;

export default invoiceSlice.reducer;
