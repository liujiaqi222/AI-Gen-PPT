import { cookies } from "next/headers";
import { get as clientGet, post as clientPost } from "./api";

/**
 * Server-side API utilities that automatically handle cookie forwarding
 * for authenticated requests in server components.
 */

export const serverGet = async <T>(endpoint: string, options?: Parameters<typeof clientGet>[1]) => {
  const cookieStore = await cookies();
  return clientGet<T>(endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      cookie: cookieStore.toString(),
    },
  });
};

export const serverPost = async <T>(
  endpoint: string,
  body: Parameters<typeof clientPost>[1],
  options?: Parameters<typeof clientPost>[2]
) => {
  const cookieStore = cookies();
  return clientPost<T>(endpoint, body, {
    ...options,
    headers: {
      ...options?.headers,
      cookie: cookieStore.toString(),
    },
  });
};