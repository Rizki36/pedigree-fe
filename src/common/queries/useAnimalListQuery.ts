import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import animalService from "../services/animal";
import type {
  GetAnimalListQuery,
  GetAnimalListResponse,
} from "../services/animal.type";

type UseAnimalListQueryProps = {
  query?: GetAnimalListQuery;
  options?: Omit<UseQueryOptions<GetAnimalListResponse>, "queryKey">;
};

const useAnimalListQuery = ({
  query,
  options,
}: UseAnimalListQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["animal/list", query],
    queryFn: async () => {
      return animalService.getAnimalList({ query });
    },
  });

  return queryResult;
};

export default useAnimalListQuery;
