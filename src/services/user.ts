import axiosInstance from "../config/axios-instance";

interface IUser {
  email: string;
  password: string;
  fullName: string;
  roleModels: string[];
}

export const addUserService = (addModel: IUser) =>
  axiosInstance.post("/user", addModel);
