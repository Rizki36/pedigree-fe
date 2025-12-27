import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  DeleteBreedingRecordBody,
  DeleteBreedingRecordResponse,
} from "@/modules/breeding/services/breeding.type";
import breedingService from "@/modules/breeding/services/breeding";

type UseDeleteBreedingRecordMutationProps = {
  options?: UseMutationOptions<
    DeleteBreedingRecordResponse,
    unknown,
    { body: DeleteBreedingRecordBody }
  >;
};

const useDeleteBreedingRecordMutation = ({
  options,
}: UseDeleteBreedingRecordMutationProps = {}) => {
  return useMutation({
    ...options,
    mutationFn: async ({ body }: { body: DeleteBreedingRecordBody }) => {
      return breedingService.deleteBreedingRecord({ body });
    },
  });
};

export default useDeleteBreedingRecordMutation;
