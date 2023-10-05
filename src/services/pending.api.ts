import axiosInstance from "../config/axios-instance";

export interface IPendingParam {
  id: number;
  companyName: string;
  clientName: string;
  markingNumber: number;
  pendingInvoiceSubModels?: IPendingModels[];
}
export interface IPendingModels {
  impaCode: string;
  itemDescription: string;
  extraDescription: string;
  pkg: string;
  qty: number;
  itemSell: number;
}

export interface IPendingPSearch {
  companyName: string | undefined;
  clientName: string | undefined;
}

export const sendPendingService = (param: IPendingParam) =>
  axiosInstance.post("/pending", param);

export const getPendingService = () => axiosInstance.get("/pending");

export const pendingSearchService = (param: IPendingPSearch) =>
  axiosInstance.post<IPendingParam[]>("/pending/search", param);
