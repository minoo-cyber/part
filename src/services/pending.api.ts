import axiosInstance from "../config/axios-instance";

export interface IPendingParam {
  id: number;
  companyName: string;
  clientName: string;
  markingNumber: number;
  pendingInvoiceSubModels: IPendingModels[];
}
export interface IPendingModels {
  impaCode: string;
  itemDescription: string;
  extraDescription: string;
  pkg: string;
  qty: number;
  itemSell: number;
}

export const sendPendingService = (param: IPendingParam) =>
  axiosInstance.post("/pending", param);

export const getPendingService = () => axiosInstance.get("/pending");
