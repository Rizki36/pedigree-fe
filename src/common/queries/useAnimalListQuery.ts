import fetchInstance from "@/common/lib/fetch-instance";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { Animal } from "../types";

type Response = { docs: Animal[]; limit: number };

type UseAnimalListQueryProps = {
  query?: {
    search?: string;
    gender_eq?: "FEMALE" | "MALE";
  };
  options?: UseQueryOptions<Response>;
};

const useAnimalListQuery = ({
  query,
  options,
}: UseAnimalListQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["animal/list", query],
    queryFn: async () => {
      return fetchInstance<Response>("/v1/animal/list", {
        method: "GET",
        query,
      });
    },
  });

  return queryResult;
};

export default useAnimalListQuery;
