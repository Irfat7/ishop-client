import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { useIdMap } from "./useIdMap";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useGetUsersCart = () => {
  const axiosSecure = useAxiosSecure();
  const [userId] = useIdMap();

  const {
    data: carts = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.CART, userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }
      const response = await axiosSecure.get(`/carts/user?userId=${userId}`);
      return response.data;
    },
    enabled: !!userId

  });
  return [carts, isPending, error, refetch];
};
