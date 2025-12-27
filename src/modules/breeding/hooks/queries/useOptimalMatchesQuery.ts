import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { GetOptimalMatchesResponse } from "@/modules/breeding/services/breeding.type";
import breedingService from "@/modules/breeding/services/breeding";

type UseOptimalMatchesQueryProps = {
  animalId?: string;
  options?: Omit<UseQueryOptions<GetOptimalMatchesResponse>, "queryKey">;
};

const useOptimalMatchesQuery = ({
  animalId,
  options,
}: UseOptimalMatchesQueryProps) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["breeding/ai/optimal-matches", animalId],
    queryFn: async () => {
      if (!animalId) {
        throw new Error("animalId is required");
      }
      return breedingService.getOptimalMatches(animalId);
    },
    enabled: !!animalId && options?.enabled !== false,
  });

  return queryResult;
};

export default useOptimalMatchesQuery;
