import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, ROUTES } from "@/utility/constant";

export type APIResponse<T = unknown> = {
  items?: T[];
  data?: T;
  error?: { code: string; message: string };
  success?: boolean;
};
export const publicApi = (subPath = "") => {
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${subPath}`,
    // headers: {
    //   Referrer: "http://localhost:3000",
    // },
  });

  api.interceptors.request.use(
    (config) => {
      // console.log("Sending request to: " + config.baseURL + config.url);
      // console.log("config: ", config);
      return config;
    },
    (error) => {
      // console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response: AxiosResponse<APIResponse>) => {
      return checkErrorCode(response);
    },
    (error) => {
      console.log("checkErrorCode(response)", error);
      return checkErrorCode(error.response);
    }
  );

  return api;
};
// need have token auth
export const privateApi = (subPath = ""): AxiosInstance => {
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${subPath}`,
    headers: { "Content-Type": "application/json" },
  });

  api.interceptors.request.use(
    async (config) => {
      const accessToken = Cookies.get(ACCESS_TOKEN);
      if (config.headers) config.headers.authorization = `${accessToken}`;
      console.log("Sending request to: " + config.baseURL + config.url);
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    async (response: AxiosResponse<APIResponse>) => checkErrorCode(response),
    async (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          Cookies.remove(ACCESS_TOKEN);
          console.log("error", error.response);
          localStorage.removeItem("user");
          localStorage.removeItem("userAvatar");
          window.location.href = ROUTES.HOME;
        }
      }
      // console.log("error12", error.response);
      return checkErrorCode(error.response);
    }
  );

  return api;
};

async function checkErrorCode(response: AxiosResponse<APIResponse>) {
  try {
    // console.log("checkErrorCode->response", response);
    switch (response.data.success) {
      case false:
        break;
      case true:
        break;

      default:
        break;
    }
    return response;
  } catch (error) {
    response = { ...response, data: { success: false } };
    console.error("Error: ", error);
    return response;
  }
}
