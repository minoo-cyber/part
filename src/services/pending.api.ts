import axiosInstance from "../config/axios-instance";

export interface IPendingParam {
  id: number;
  companyName?: string;
  clientName?: string;
  createdDate?: string;
  totalAmount?: string;
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

export interface IPendingSearch {
  companyName: string | undefined;
  clientName: string | undefined;
}
export interface ISave {
  clientName: string;
  companyName: string;
  dateEntered: string;
  departDate: string;
  port: string;
  invoiceNumber: string;
  category: string;
  markup: string;
  subSaveModels: ISubSaveModels[];
}
export interface ISubSaveModels {
  id: number;
  impaCode: string;
  itemDesc: string;
  extraDesc: string;
  qty: number;
  packageName: string;
  itemSell: number;
}

export const sendPendingService = (param: IPendingParam) =>
  axiosInstance.post("/pending", param);

export const getPendingService = () => axiosInstance.get("/pending");

export const pendingSearchService = (param: IPendingSearch) =>
  axiosInstance.post<IPendingParam[]>("/pending/search", param);

export const pendingSaveService = (param: ISave) =>
  axiosInstance.post("/invoice/save", param);

export const pendingExportDelService = (batchId: number) =>
  axiosInstance
    .get(`/export/delivery-pocket/${batchId}`, {
      responseType: "blob",
    })
    .then((data) => new Blob([data.data], { type: data.data.type }));

export const pendingExportPlainService = (batchId: number) =>
  axiosInstance
    .get(`/export/plain-paper/${batchId}`, {
      responseType: "blob",
    })
    .then((data) => new Blob([data.data], { type: data.data.type }));

export const pendingExportPickService = (batchId: number) =>
  axiosInstance
    .get(`/export/pick-report/${batchId}`, {
      responseType: "blob",
    })
    .then((data) => new Blob([data.data], { type: data.data.type }));
