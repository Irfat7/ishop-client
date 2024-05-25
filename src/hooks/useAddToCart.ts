import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useAddToCart = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const addToCart = async ({
    uId,
    productId,
  }: {
    uId: string;
    productId: string;
  }) => {
    let userId = queryClient.getQueryData(["UID", uId]);
    if (!userId) {
      const { data } = await axiosSecure.get(
        `/users/id-map/getUser?firebaseId=${uId}`,
      );
      userId = queryClient.setQueryData(["UID", uId], data.id);
    }
    const response = await axiosSecure.post("/carts/", {
      userId,
      productId,
      quantity: 1,
    });
    return response.data;
  };

  const {
    mutateAsync: addCart,
    isPending: pendingAddToCart,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART]
      })
    }
  });
  return { addCart, pendingAddToCart, isError, isSuccess, error };
};
