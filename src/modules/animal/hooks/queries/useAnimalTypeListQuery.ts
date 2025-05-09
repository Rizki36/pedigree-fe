import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
  GetAnimalTypeListQuery,
  GetAnimalTypeListResponse,
} from "@/modules/animalType/services/animalType.type";
import animalTypeService from "@/modules/animalType/services/animalType";

type UseAnimalTypeListQueryProps = {
  query?: GetAnimalTypeListQuery;
  options?: UseQueryOptions<GetAnimalTypeListResponse>;
};

const useAnimalTypeListQuery = ({
  query,
  options,
}: UseAnimalTypeListQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["animalType/list", query],
    queryFn: async () => {
      return animalTypeService.getAnimalTypeList({ query });
    },
  });

  return queryResult;
};

export default useAnimalTypeListQuery;
