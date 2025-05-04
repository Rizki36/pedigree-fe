import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type {
  UpdateAchievementBody,
  UpdateAchievementResponse,
} from "../services/achievement.type";
import achievementService from "../services/achievement";

type UseUpdateAchievementMutationProps = {
  options?: UseMutationOptions<
    UpdateAchievementResponse,
    unknown,
    UpdateAchievementBody
  >;
};

const useUpdateAchievementMutation = ({
  options,
}: UseUpdateAchievementMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      return achievementService.updateAchievement({
        body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["achievement/list"],
      });
    },
    ...options,
  });
};

export default useUpdateAchievementMutation;
