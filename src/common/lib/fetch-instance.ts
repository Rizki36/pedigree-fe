import { BASE_URL } from "@/common/constants";
import qs from "qs";

type Config = RequestInit & {
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
  query?: Record<string, any>;
  headers?: Record<string, any>;
};

const fetchInstance = <T>(endpoint: string, config: Config) => {
  const queryString = config.query ? `?${qs.stringify(config.query)}` : "";

  const url = BASE_URL + endpoint + queryString;

  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    ...config.headers,
  };

  const requestInit: RequestInit = {
    ...config,
    headers,
    credentials: "include", // important to include cookies
  };

  if (headers["Content-Type"] === "application/json") {
    return fetch(url, requestInit).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as T;
      }

      throw await res.json();
    });
  }

  return fetch(url, requestInit) as Promise<T>;
};

export default fetchInstance;
