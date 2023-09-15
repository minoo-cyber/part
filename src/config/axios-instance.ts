import axios, { AxiosInstance } from "axios";
import { setToast } from "../redux/slices/toastSlice";
import { clearUserToken, userToken } from "../redux/slices/userSlice";
import { store } from "../redux/store";
import baseUrl from "./url";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: undefined,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;",
    crossDomain: true,
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  if (config?.headers && store.getState().user.token) {
    config.headers.Authorization = store.getState().user.token;
    config.headers.Refresh = store.getState().user.refresh;
  }

  return Promise.resolve(config);
});

axiosInstance.interceptors.response.use(
  function onSuccessApi(response) {
    const accessToken = response.headers["authorization"];
    const refreshToken = response.headers["refresh"];
    if (accessToken && refreshToken) {
      store.dispatch(
        userToken({
          refresh: refreshToken,
          token: accessToken,
        })
      );
    }
    return response;
  },

  function onErrorApi(error) {
    const accessToken = error.response.headers.authorization;
    const refreshToken = error.response.headers.refresh;
    if (accessToken && refreshToken) {
      store.dispatch(
        userToken({
          refresh: refreshToken,
          token: accessToken,
        })
      );
    }
    if (
      typeof error.response.data == "object" &&
      error.response.status === 400
    ) {
      let message = "";
      for (const key in error.response.data) {
        if (Object.prototype.hasOwnProperty.call(error.response.data, key)) {
          const element = error.response.data[key];
          if (typeof element == "string") {
            message += `${element}.`;
          }
        }
      }
      if (message) {
        store.dispatch(
          setToast({
            open: true,
            type: "error",
            text: message,
          })
        );
      }
    } else if (
      (error.response.status === 500 || error.response.status === 403) &&
      error.response.data.message
    ) {
      store.dispatch(
        setToast({
          open: true,
          type: "warning",
          text: error.response.data.message as string,
        })
      );
    }

    if (error.response.status === 401) {
      store.dispatch(clearUserToken());
      window.location.pathname = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
