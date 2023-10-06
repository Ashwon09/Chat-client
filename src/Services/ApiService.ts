import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "http://192.168.31.91:3001";

const generalAPIInstance: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
});

generalAPIInstance.interceptors.response.use(
  //you can define type for response if you want to
  (response) => {
    // Return the response data
    return response;
  },
  (error) => {
    error?.response?.data?.message
      ? alert(error?.response?.data?.message)
      : alert(error?.message);

    return error;
  }
);

export const generalAPI = generalAPIInstance;
