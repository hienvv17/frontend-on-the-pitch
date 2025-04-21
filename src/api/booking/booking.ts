import { ROUTES } from "@/utility/constant";
import { publicApi, privateApi } from "../base";

const subPath = "";

const useBookingApi = () => {
  const configApi = publicApi(subPath);
  const GET_OPTIONS = async (url: string) => {
    const res = await configApi.get(url);
    return res.data;
  };
  return { GET_OPTIONS };
};

export { useBookingApi };
