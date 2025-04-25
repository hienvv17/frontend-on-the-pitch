import { publicApi } from "../base";

interface SearchFieldData {
  sportCategoryId: number;
  branchId: number;
  date: string;
  startTime: string | null;
  endTime: string | null;
}

const subPath = "";

const useBookingApi = () => {
  const configApi = publicApi(subPath);

  const GET_OPTIONS = async (url: string) => {
    const res = await configApi.get(url);
    return res.data;
  };

  const POST_SEARCH_FIELDS = async (url: string, data: SearchFieldData) => {
    const response = await configApi.post(url, data);

    return response;
  };

  return { GET_OPTIONS, POST_SEARCH_FIELDS };
};

export { useBookingApi };
