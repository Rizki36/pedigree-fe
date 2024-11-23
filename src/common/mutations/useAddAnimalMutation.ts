import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import animalService from "../services/animal";
import type {
  PostAddAnimalBody,
  PostAddAnimalResponse,
} from "../services/animal.type";

type UseAddAnimalMutationProps = {
  options?: UseMutationOptions<
    PostAddAnimalResponse,
    unknown,
    PostAddAnimalBody
  >;
};

const useAddAnimalMutation = ({ options }: UseAddAnimalMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      return animalService.postAddAnimal({
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
