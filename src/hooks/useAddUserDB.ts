import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constants";
import { IUser } from "../types";

export const useAddUserDB = () => {
    return useMutation({
        mutationFn: async (userInfo: IUser) => {
            try {
                const response = await axios.post(`${baseUrl}users`, userInfo)
                return response.data
            } catch (error) {
                throw new Error
            }
        }
    })
};