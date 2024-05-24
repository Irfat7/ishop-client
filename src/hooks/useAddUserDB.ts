import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constants";

export const useAddUserDB = () => {
  type userArg = {
    name: string;
    email: string;
    imageUrl: string;
    role: string;
  }
  
  return useMutation({
    mutationFn: async (userInfo: userArg) => {
      try {
        const response = await axios.post(`${baseUrl}users`, userInfo);
        return response.data;
      } catch (error) {
        throw new Error();
      }
    },
  });
};
