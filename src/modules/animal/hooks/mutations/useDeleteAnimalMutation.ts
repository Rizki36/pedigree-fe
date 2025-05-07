import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type {
  DeleteAnimalBody,
  DeleteAnimalResponse,
} from "@/modules/animal/services/animal.type";
import animalService from "@/modules/animal/services/animal";

type UseDeleteAnimalMutationProps = {
  options?: UseMutationOptions<DeleteAnimalResponse, unknown, DeleteAnimalBody>;
};

const useDeleteAnimalMutation = ({ options }: UseDeleteAnimalMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      return animalService.deleteAnimal({
        body,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["animal/list"],
      });
    },
    ...options,
  });
};

export default useDeleteAnimalMutation;
