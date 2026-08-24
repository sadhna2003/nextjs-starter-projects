import Cookies from "js-cookie";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetchOptions extends Omit<RequestInit, "method" | "body"> {
  method?: HttpMethod;
  body?: unknown;
  requiresAuth?: boolean;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: unknown;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    requiresAuth = true,
    headers: customHeaders,
    ...restOptions
  } = options;

  const mode = process.env.NEXT_PUBLIC_API_MODE || "dummy";
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummyjson.com";
  
  const url = `${baseUrl}${endpoint}`;

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  let token = null; 
  if (typeof window !== "undefined") {
    token = Cookies.get("accessToken");
  }

  if (requiresAuth && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (customHeaders) {
    const customHeadersObj = new Headers(customHeaders);
    customHeadersObj.forEach((value, key) => headers.set(key, value));
  }

  const fetchConfig: RequestInit = {
    method,
    headers,
    ...restOptions,
  };

  if (body) {
    fetchConfig.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchConfig);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: response.statusText };
      }

      const errorObj: ApiError = {
        statusCode: response.status,
        message: errorData.message || "An error occurred during the request.",
        error: errorData,
      };
      
      throw errorObj;
    }

    // For 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    // If it's already our structured error, just rethrow
    if ((error as ApiError).statusCode) {
      throw error;
    }

    // Network errors or unexpected issues
    const networkError: ApiError = {
      statusCode: 0,
      message: error instanceof Error ? error.message : "Network error",
      error,
    };
    throw networkError;
  }
}
