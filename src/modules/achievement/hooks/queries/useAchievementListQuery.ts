import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
  GetAchievementListQuery,
  GetAchievementListResponse,
} from "../../services/achievement.type";
import achievementService from "../../services/achievement";

type UseAchievementListQueryProps = {
  query?: GetAchievementListQuery;
  options?: Omit<UseQueryOptions<GetAchievementListResponse>, "queryKey">;
};

const useAchievementListQuery = ({
  query,
  options,
}: UseAchievementListQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["achievement/list", query],
    queryFn: async () => {
      return achievementService.getAchievementList({ query });
    },
  });

  return queryResult;
};

export default useAchievementListQuery;
