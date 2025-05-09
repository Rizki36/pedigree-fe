import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { GetDobRequirementResponse } from "@/modules/animal/services/animal.type";
import animalService from "@/modules/animal/services/animal";

type UseDobRequirementQueryProps = {
  options?: Omit<UseQueryOptions<GetDobRequirementResponse>, "queryKey">;
};

const useDobRequirementQuery = ({
  options,
}: UseDobRequirementQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["animal/dob-requirement"],
    queryFn: async () => {
      return animalService.getDobRequirement();
    },
  });

  return queryResult;
};

export default useDobRequirementQuery;