import { AUTH_TOKEN_KEY } from "@/constants";
import { jwtDecode } from "jwt-decode";

export const getAuthToken = (): string => {
  const token = decodeURIComponent(document.cookie).split("=");

  let accessToken: string = "";

  if (token[0] === AUTH_TOKEN_KEY) accessToken = token[1];

  console.log(1234234, { accessToken });

  return accessToken;
};

export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

export const clearItemFromCookie = (name: string, path: string = "/") => {
  document.cookie = `${name}=; path=${path}; Max-Age=0`;
};

export const isAuthenticated = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    const expiration = decoded?.exp ?? 0;

    if (Date.now() >= expiration * 1000) {
      return false;
    }

    return true;
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
};
