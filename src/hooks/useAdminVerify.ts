import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useAdminVerify = (email: string) => {
  const axiosInstance = useAxiosSecure();
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN, email],
    queryFn: async () => {
      if (email === "") {
        return null;
      }
      const { data: admin } = await axiosInstance.get(
        `/users/admin-check/${email}`,
      );
      return admin;
    },
    staleTime: 0,
  });
  return [data, isLoading, isError];
};
