import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { GetAIRecommendationResponse } from "@/modules/breeding/services/breeding.type";
import breedingService from "@/modules/breeding/services/breeding";

type UseAIRecommendationQueryProps = {
  fatherId?: string;
  motherId?: string;
  options?: Omit<UseQueryOptions<GetAIRecommendationResponse>, "queryKey">;
};

const useAIRecommendationQuery = ({
  fatherId,
  motherId,
  options,
}: UseAIRecommendationQueryProps) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["breeding/ai/recommend", fatherId, motherId],
    queryFn: async () => {
      if (!fatherId || !motherId) {
        throw new Error("Both fatherId and motherId are required");
      }
      return breedingService.getAIRecommendation({
        body: { fatherId, motherId },
      });
    },
    enabled: !!(fatherId && motherId) && options?.enabled !== false,
  });

  return queryResult;
};

export default useAIRecommendationQuery;
