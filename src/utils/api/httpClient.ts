import { BASE_URL } from "@/constants";
import axios from "axios";
import { getAuthToken } from "../auth";

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const httpClientWithAuth = axios.create({
  baseURL: BASE_URL,
});

httpClientWithAuth.interceptors.request.use((cfg) => {
  const modifiedConfig = { ...cfg };
  const accessToken = getAuthToken() as string;

  modifiedConfig.headers.Authorization = `Bearer ${accessToken}`;
  modifiedConfig.headers["Content-Type"] = "application/json";

  return modifiedConfig;
});
