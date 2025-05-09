import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { GetParentRequirementResponse } from "@/modules/animal/services/animal.type";
import animalService from "@/modules/animal/services/animal";

type UseParentRequirementQueryProps = {
  options?: Omit<UseQueryOptions<GetParentRequirementResponse>, "queryKey">;
};

const useParentRequirementQuery = ({
  options,
}: UseParentRequirementQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["animal/parent-requirement"],
    queryFn: async () => {
      return animalService.getParentRequirement();
    },
  });

  return queryResult;
};

export default useParentRequirementQuery;