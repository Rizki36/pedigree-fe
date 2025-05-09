import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { GetStatusDistributionResponse } from "@/modules/animal/services/animal.type";
import animalService from "@/modules/animal/services/animal";

type UseStatusDistributionQueryProps = {
  options?: Omit<UseQueryOptions<GetStatusDistributionResponse>, "queryKey">;
};

const useStatusDistributionQuery = ({
  options,
}: UseStatusDistributionQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["animal/status-distribution"],
    queryFn: async () => {
      return animalService.getStatusDistribution();
    },
  });

  return queryResult;
};

export default useStatusDistributionQuery;