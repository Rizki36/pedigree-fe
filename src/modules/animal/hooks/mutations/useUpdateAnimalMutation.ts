import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type {
  UpdateAnimalBody,
  UpdateAnimalResponse,
} from "@/modules/animal/services/animal.type";
import animalService from "@/modules/animal/services/animal";

type UseUpdateAnimalMutationProps = {
  options?: UseMutationOptions<UpdateAnimalResponse, unknown, UpdateAnimalBody>;
};

const useUpdateAnimalMutation = ({ options }: UseUpdateAnimalMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      return animalService.updateAnimal({
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

export default useUpdateAnimalMutation;
