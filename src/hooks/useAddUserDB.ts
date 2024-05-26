import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../constants";
import { useAxiosSecure } from "./useAxiosSecure";

export const useAddUserDB = () => {
  const axiosInstance = useAxiosSecure()
  type userArg = {
    name: string;
    email: string;
    imageUrl: string;
    role: string;
  }

  return useMutation({
    mutationFn: async (userInfo: userArg) => {
      try {
        const response = await axiosInstance.post(`${baseUrl}users`, userInfo);
        return response.data;
      } catch (error) {
        throw new Error();
      }
    },
  });
};
