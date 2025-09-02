import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { GetBreedingRecordResponse } from "@/modules/breeding/services/breeding.type";
import { getBreedingRecord } from "@/modules/breeding/services/breeding";

interface UseBreedingRecordQueryParams {
  breedingId: string;
  options?: Partial<UseQueryOptions<GetBreedingRecordResponse, Error>>;
}

const useBreedingRecordQuery = ({
  breedingId,
  options = {},
}: UseBreedingRecordQueryParams) => {
  return useQuery({
    queryKey: ["breeding/record", breedingId],
    queryFn: () => getBreedingRecord({ breedingId }),
    ...options,
  });
};

export default useBreedingRecordQuery;
