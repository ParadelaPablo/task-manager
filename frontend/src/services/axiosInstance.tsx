import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const envBase = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:8080";
const BASE_URL = envBase.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (import.meta.env.DEV) {
      const url = `${config.baseURL ?? ""}${config.url ?? ""}`;
      console.log("➡️ Request:", (config.method ?? "GET").toUpperCase(), url, {
        headers: config.headers,
        params: config.params,
        data: config.data,
      });
    }
    return config;
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error("❌ Request Error:", error);
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      const url = response.config?.url ?? "";
      console.log("✅ Response:", response.status, url, response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      const status = error.response?.status;
      const url = error.config?.url ?? "";
      console.error("🛑 Response Error:", status, url, error.response?.data ?? error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
