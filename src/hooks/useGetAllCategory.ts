import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../lib/react-query/keys";
import axios from "axios";
import { baseUrl } from "../constants";

export const useGetAllCategory = () => {
  const {
    data: categories = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CATEGORY],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}categories`);
      return response.data;
    },
  });
  return [categories, isPending, isError];
};
