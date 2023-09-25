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
  itemDescription?: string;
  text: string;
  supplier: string;
  qty: number;
  pack: string;
  cost?: number;
  sell: number;
  extSell?: number;
}

export const invoiceSearchService = (param: ISearchParam) =>
  axiosInstance.post<ISearchRes[]>("/invoice/search", param);
