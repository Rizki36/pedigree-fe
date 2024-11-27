import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import animalService from "../services/animal";
import type {
  UpdateAnimalBody,
  UpdateAnimalResponse,
} from "../services/animal.type";

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
