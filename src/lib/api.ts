import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
/**
 * API utilities for making requests to the backend.
 */
export type Options = {
  method: "POST" | "GET";
  headers?: HeadersInit;
  cache?: RequestCache;
  body?: unknown;
};

export const apiCall = async <T>(endPoint: string, options: Options,type:'server'|'client'='client'):Promise<T> => {
  try {
    const result = await fetch(`${BACKEND_URL}${endPoint}`, {
      headers: {
        "Content-Type": "Application/JSON",
        ...options.headers,
      },
      method: options.method,
      credentials: "include",
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const res = await result.json();
    if (res.status === 401) {
      if (type === 'client') {
        window.location.href = "/sign-in";
      }
      else {
        redirect('/sign-in')
      }
    }
    return res;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const get = <T>(endpoint: string, options?: Omit<Options, "method" | "body">) => {
  return apiCall<T>(endpoint, {
    method: "GET",
    ...options,
  });
};

export const post = <T>(endpoint: string, body: unknown, options?: Omit<Options, "method" | "body">) => {
  return apiCall<T>(endpoint, {
    method: "POST",
    body,
    ...options,
  });
};
