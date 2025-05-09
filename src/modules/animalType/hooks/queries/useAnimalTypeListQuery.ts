import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { GetAnimalTypeListResponse } from "@/modules/animalType/services/animalType.type";
import { AnimalType } from "@/modules/animalType/types";

type UseAnimalTypeListQueryProps = {
  options?: UseQueryOptions<GetAnimalTypeListResponse>;
};

const useAnimalTypeListQuery = ({
  options,
}: UseAnimalTypeListQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["animalType/list"],
    queryFn: async () => {
      return {
        // fill docs with all AnimalType values
        // this is a workaround to avoid using the API
        docs: Object.entries(AnimalType).map(([_, value]) => value),
      };
    },
  });

  return queryResult;
};

export default useAnimalTypeListQuery;
