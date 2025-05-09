import { privateApi } from "../base";

const subDetailPath = 'upload-auth';

const useUploadAuthApi = () => {
    const privateAPI = privateApi(subDetailPath);

    const GET_UPLOAD_AUTH = async () => {
        const response = await privateAPI.get('');
        return response.data;
    };

    return {
        GET_UPLOAD_AUTH,
    };
};

export { useUploadAuthApi };
