import axiosInstance from "../config/axios-instance";

interface ISearchParam {
  batchId: number;
  clientName: string;
  companyName: string | undefined;
}
export interface ISearchRes {
  batchNumber: number;
  invoicedBy: string;
  port: string;
  orderNumber: string;
  department: string;
  markingNumber: number;
  client: string;
  companyName: string;
  invoiceNumber: string;
  invoiceSubModels: IInvoiceSubModels[];
  tacompany: string;
  totalAmount: string;
  date: Date | string;
}

export interface IInvoiceSubModels {
  del: boolean;
  item: number;
  impa: string;
  itemDescription: string;
  text: string;
  supplier: string;
  qty: number;
  pack: string;
  cost: number;
  sell: number;
  extSell: number;
}

export interface IAddParam {
  companyName: string | undefined;
  clientName: string;
  invoiceModels: IInvoiceAddModels[];
}

export interface IInvoiceAddModels {
  itemDesc: string;
  qty: number;
}

export interface IAmountParam {
  impaCode: string;
  batchId: number;
}

export interface IAmountRes {
  itemDesc: string;
  pkg: string;
  impaCode: string;
  itemSell: number;
}

export interface IBatchId {
  companyName: string;
  clientName: string;
}

export interface IUpload {
  clientName: string | undefined;
  companyName: string | undefined;
  file: string | undefined;
}

export const invoiceSearchService = (param: ISearchParam) =>
  axiosInstance.post<ISearchRes[]>("/invoice/search", param);

export const companyNameService = (title: string) =>
  axiosInstance.get<string[]>(`/invoice/company?companyName=${title}`);

export const clientService = (companyName: string) =>
  axiosInstance.get<string[]>(`/invoice/client/${companyName}`);

export const addInvoiceService = (param: IAddParam) =>
  axiosInstance.post("/invoice/send-invoices", param);

export const invoiceUploadService = (param: IUpload) =>
  axiosInstance.post("/invoice/upload-invoice", param, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const itemDesService = (item: string) =>
  axiosInstance.get(`/invoice/item?item=${item}`);

export const itemAmountService = (param: IAmountParam) =>
  axiosInstance.post<IAmountRes>("/invoice/item-amount", param);

export const batchIdService = (param: IBatchId) =>
  axiosInstance.post("/invoice/search-client-company", param);
