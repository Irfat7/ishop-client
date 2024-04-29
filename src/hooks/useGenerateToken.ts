import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constants";

export const useGenerateToken = () => {
    const { mutateAsync: generateToken, isPending: tokenLoading, isError: tokenError } = useMutation({
        mutationFn: async (email: string) => {
            const response = await axios.post(`${baseUrl}jwt`, { user: { email } })
            return response.data
        }
    })
    return { generateToken, tokenLoading, tokenError }
};