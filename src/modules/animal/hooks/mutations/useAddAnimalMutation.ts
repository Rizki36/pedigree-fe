import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type {
  PostAnimalBody,
  PostAnimalResponse,
} from "@/modules/animal/services/animal.type";
import animalService from "@/modules/animal/services/animal";

type UseAddAnimalMutationProps = {
  options?: UseMutationOptions<PostAnimalResponse, unknown, PostAnimalBody>;
};

const useAddAnimalMutation = ({ options }: UseAddAnimalMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      return animalService.postAnimal({
        body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["animal/list"],
      });
    },
    ...options,
  });
};

export default useAddAnimalMutation;
