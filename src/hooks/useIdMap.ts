import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";
import { useAxiosSecure } from "./useAxiosSecure";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useIdMap = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const token = localStorage.getItem("access-token");
  const { data: userId, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.UID, user?.uid],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/users/id-map/getUser?firebaseId=${user?.uid}`,
      );
      return response.data.id;
    },
    enabled: !!user && !!token,
  });
  return [userId, isLoading];
};
