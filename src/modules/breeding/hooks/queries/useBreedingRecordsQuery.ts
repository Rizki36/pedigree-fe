import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
  GetBreedingRecordsQuery,
  GetBreedingRecordsResponse,
} from "@/modules/breeding/services/breeding.type";
import breedingService from "@/modules/breeding/services/breeding";

type UseBreedingRecordsQueryProps = {
  query?: GetBreedingRecordsQuery;
  options?: Omit<UseQueryOptions<GetBreedingRecordsResponse>, "queryKey">;
};

const useBreedingRecordsQuery = ({
  query,
  options,
}: UseBreedingRecordsQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["breeding/records", query],
    queryFn: async () => {
      return breedingService.getBreedingRecords({ query });
    },
  });

  return queryResult;
};

export default useBreedingRecordsQuery;
