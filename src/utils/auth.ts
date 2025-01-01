import { AUTH_TOKEN_KEY } from "@/constants";
import { jwtDecode } from "jwt-decode";
import { decode } from "punycode";

export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
    return token;
  }
  return null;
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
