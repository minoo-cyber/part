import axiosInstance from "../config/axios-instance";

interface ILoginParam {
  email: string;
  password: string;
}

interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}

interface IOtpParam {
  email: string | undefined;
  otp: string;
}

export const loginService = (param: ILoginParam) =>
  axiosInstance.post<ILoginRes>("/login", param);

export const getOtpService = (email: string) =>
  axiosInstance.get(`/otp/${email}`);

export const getOtpValidation = (otpParam: IOtpParam) =>
  axiosInstance.post("/otp/validation", otpParam);
