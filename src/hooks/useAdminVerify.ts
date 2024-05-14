import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useAdminVerify = (email: string) => {
  const axiosInstance = useAxiosSecure();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", email],
    queryFn: async () => {
      console.log('made a call with email value', email);
      if (email === "") {
        console.log('admin check value from will be null');
        return null;
      }
      const { data: admin } = await axiosInstance.get(
        `/users/admin-check/${email}`,
      );
      console.log('main admin check called');
      return admin;
    },
    staleTime: 0,
  });
  return [data, isLoading, isError];
};
