import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { GetCompatibilityCheckResponse } from "@/modules/breeding/services/breeding.type";
import breedingService from "@/modules/breeding/services/breeding";

type UseCompatibilityCheckQueryProps = {
  fatherId?: string;
  motherId?: string;
  options?: Omit<UseQueryOptions<GetCompatibilityCheckResponse>, "queryKey">;
};

const useCompatibilityCheckQuery = ({
  fatherId,
  motherId,
  options,
}: UseCompatibilityCheckQueryProps) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["breeding/ai/compatibility", fatherId, motherId],
    queryFn: async () => {
      if (!fatherId || !motherId) {
        throw new Error("Both fatherId and motherId are required");
      }
      return breedingService.getCompatibilityCheck(fatherId, motherId);
    },
    enabled: !!(fatherId && motherId) && options?.enabled !== false,
  });

  return queryResult;
};

export default useCompatibilityCheckQuery;
