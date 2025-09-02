import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  CreateBreedingRecordBody,
  CreateBreedingRecordResponse,
} from "@/modules/breeding/services/breeding.type";
import breedingService from "@/modules/breeding/services/breeding";

type UseCreateBreedingRecordMutationProps = {
  options?: UseMutationOptions<
    CreateBreedingRecordResponse,
    unknown,
    { body: CreateBreedingRecordBody }
  >;
};

const useCreateBreedingRecordMutation = ({
  options,
}: UseCreateBreedingRecordMutationProps = {}) => {
  return useMutation({
    ...options,
    mutationFn: async ({ body }: { body: CreateBreedingRecordBody }) => {
      return breedingService.createBreedingRecord({ body });
    },
  });
};

export default useCreateBreedingRecordMutation;
