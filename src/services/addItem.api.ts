import axiosInstance from "../config/axios-instance";

export interface IAddParam {
  impaCode: string;
  description: string;
  unit: string;
}

export const addItemService = (param: IAddParam) =>
  axiosInstance.post("/impa", param);
