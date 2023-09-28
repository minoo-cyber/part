import axiosInstance from "../config/axios-instance";

interface ISearchParam {
  batchId: number;
  clientName: string;
  companyName: string;
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

export const invoiceSearchService = (param: ISearchParam) =>
  axiosInstance.post<ISearchRes[]>("/invoice/search", param);

export const companyNameService = (title: string) =>
  axiosInstance.get<string[]>(`/invoice/company?companyName=${title}`);

export const clientService = (companyName: string) =>
  axiosInstance.get<string[]>(`/invoice/client/${companyName}`);

export const addInvoiceService = (param: IAddParam) =>
  axiosInstance.post("/invoice/send-invoices", param);
