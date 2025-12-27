import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  UpdateBreedingRecordBody,
  UpdateBreedingRecordResponse,
} from "@/modules/breeding/services/breeding.type";
import breedingService from "@/modules/breeding/services/breeding";

type UseUpdateBreedingRecordMutationProps = {
  options?: UseMutationOptions<
    UpdateBreedingRecordResponse,
    unknown,
    { body: UpdateBreedingRecordBody }
  >;
};

const useUpdateBreedingRecordMutation = ({
  options,
}: UseUpdateBreedingRecordMutationProps = {}) => {
  return useMutation({
    ...options,
    mutationFn: async ({ body }: { body: UpdateBreedingRecordBody }) => {
      return breedingService.updateBreedingRecord({ body });
    },
  });
};

export default useUpdateBreedingRecordMutation;
