import { BASE_URL } from "@/constants";

type Config = RequestInit & {
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
  headers?: Record<string, any>;
};

const fetchInstance = (endpoint: string, config: Config) => {
  const url = BASE_URL + endpoint;

  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    ...config.headers,
  };

  const requestInit: RequestInit = {
    ...config,
    headers,
  };

  return fetch(url, requestInit);
};

export default fetchInstance;
