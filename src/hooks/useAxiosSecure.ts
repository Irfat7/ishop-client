import axios from "axios";
import { useLogout } from "./useLogout";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const useAxiosSecure = () => {
  const { logOut } = useLogout();
  axiosInstance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.data.logOut && error.response.status === 401 || error.response.status === 403) {
        logOut();
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
