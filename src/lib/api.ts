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

export const apiCall = async (endPoint: string, options: Options) => {
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
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const get = (endpoint: string, options?: Omit<Options, "method" | "body">) => {
  return apiCall(endpoint, {
    method: "GET",
    ...options,
  });
};

export const post = (endpoint: string, body: unknown, options?: Omit<Options, "method" | "body">) => {
  return apiCall(endpoint, {
    method: "POST",
    body,
    ...options,
  });
};
