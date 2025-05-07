import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import achievementService from "../../services/achievement";
import type {
  PostAchievementBody,
  PostAchievementResponse,
} from "../../services/achievement.type";

type UseAddAchievementMutationProps = {
  options?: UseMutationOptions<
    PostAchievementResponse,
    unknown,
    PostAchievementBody
  >;
};

const useAddAchievementMutation = ({
  options,
}: UseAddAchievementMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      return achievementService.postAchievement({
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

export default useAddAchievementMutation;
