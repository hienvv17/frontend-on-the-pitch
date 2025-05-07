import { privateApi, publicApi } from "../base";
import { UserUpdateData } from "@/types/UserType";

const subPath = "";

const useUserApiPublic = () => {
  const configApi = publicApi(subPath);

  const GET_USER_PUBLIC = async (url: string) => {
    const res = await configApi.get(url);
    console.log("GET_USER_PUBLIC: ", res);
    return res.data;
  };

  const POST_USER_PUBLIC = async (url: string, data: UserUpdateData) => {
    const response = await configApi.post(url, data);

    return response;
  };

  return { GET_USER_PUBLIC, POST_USER_PUBLIC };
};

const useUserApiPrivate = () => {
  const configApi = privateApi(subPath);

  const GET_P = async (url: string) => {
    const res = await configApi.get(url);
    // console.log("res", res);
    return res.data;
  };

  const POST_P = async (url: string, data?: UserUpdateData) => {
    return await configApi.post(url, JSON.stringify(data));
  };

  return { GET_P, POST_P };
};

export { useUserApiPublic, useUserApiPrivate };
