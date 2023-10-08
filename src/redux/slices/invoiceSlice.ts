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
    setInvoiceInfoSelect: (state, action: PayloadAction) => {
      state.data.map = Object.assign(state.data.map, action.payload);
    },
    setInvoiceNotFind: (state, action: PayloadAction) => {
      state.data.notFoundedItems = Object.assign(
        state.data.notFoundedItems,
        action.payload
      );
    },
    setInvoiceClearData: (state) => {
      state.data = [];
    },
  },
});

export const {
  setInvoiceData,
  setInvoiceInfoSelect,
  setInvoiceClearData,
  setInvoiceNotFind,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
