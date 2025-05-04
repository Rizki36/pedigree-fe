import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import achievementService from "../services/achievement";
import type {
  DeleteAchievementBody,
  DeleteAchievementResponse,
} from "../services/achievement.type";

type UseDeleteAchievementMutationProps = {
  options?: UseMutationOptions<
    DeleteAchievementResponse,
    unknown,
    DeleteAchievementBody
  >;
};

const useDeleteAchievementMutation = ({
  options,
}: UseDeleteAchievementMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      return achievementService.deleteAchievement({
        body,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["achievement/list"],
      });
    },
    ...options,
  });
};

export default useDeleteAchievementMutation;
