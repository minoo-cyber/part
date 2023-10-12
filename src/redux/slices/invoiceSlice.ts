import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface InvoiceSlice {
  dataInvoice: any;
}

const initialState: InvoiceSlice = {
  dataInvoice: [],
};

export const invoiceSlice = createSlice({
  name: "invoiceSlice",
  initialState,
  reducers: {
    setInvoiceData: (state, action: PayloadAction) => {
      state.dataInvoice = action.payload;
    },
    setInvoiceInfoSelect: (state, action: PayloadAction) => {
      state.dataInvoice.map = Object.assign(
        state.dataInvoice.map,
        action.payload
      );
    },
    setInvoiceNotFind: (state, action: PayloadAction) => {
      state.dataInvoice.notFoundedItems = Object.assign(
        state.dataInvoice.notFoundedItems,
        action.payload
      );
    },
    setInvoiceClearData: (state) => {
      state.dataInvoice = [];
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
