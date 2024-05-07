import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constants";

export const useSearchProduct = (
  initialSearchTerm: string,
  debounceTime: number = 300,
) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  // Debounce the setSearchTerm function
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(initialSearchTerm);
    }, debounceTime);

    return () => clearTimeout(debounceTimer);
  }, [initialSearchTerm, debounceTime]);

  const {
    data: searchResults = [],
    status,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      if (searchTerm) {
        const response = await axios.get(`${baseUrl}products/items/search`, {
          params: { searchTerm },
        });
        return response.data;
      }
      return null;
    },
    enabled: !!searchTerm,
  });

  return [searchResults, status, isLoading, isError, setSearchTerm];
};
