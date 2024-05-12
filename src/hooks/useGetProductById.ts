import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../lib/react-query/keys";
import axios from "axios";
import { baseUrl } from "../constants";

export const useGetProductById = (productId: string) => {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_ONE_PRODUCT, productId],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}products/${productId}`);
      return response.data;
    },
    retry:false
  });
  return [product, isLoading, error];
};
