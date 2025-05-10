import { useInfiniteQuery } from "@tanstack/react-query";
import type {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import type {
  GetAnimalListQuery,
  GetAnimalListResponse,
} from "@/modules/animal/services/animal.type";
import animalService from "@/modules/animal/services/animal";

type UseInfiniteAnimalListQueryProps = {
  query?: Omit<GetAnimalListQuery, "cursor">;
  options?: Omit<
    UseInfiniteQueryOptions<
      GetAnimalListResponse,
      unknown,
      InfiniteData<GetAnimalListResponse>,
      GetAnimalListResponse,
      QueryKey,
      string
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >;
};

const useInfiniteAnimalListQuery = ({
  query,
  options,
}: UseInfiniteAnimalListQueryProps = {}) => {
  return useInfiniteQuery({
    ...options,
    queryKey: ["animal/infinite-list", query],
    initialPageParam: "",
    queryFn: async ({ pageParam }) => {
      return animalService.getAnimalList({
        query: {
          limit: 20,
          ...query,
          cursor: pageParam || undefined,
        },
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) return lastPage.nextCursor;
      return undefined;
    },
  });
};

export default useInfiniteAnimalListQuery;
