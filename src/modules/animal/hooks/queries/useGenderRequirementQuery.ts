import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { GetGenderRequirementResponse } from "@/modules/animal/services/animal.type";
import animalService from "@/modules/animal/services/animal";

type UseGenderRequirementQueryProps = {
  options?: Omit<UseQueryOptions<GetGenderRequirementResponse>, "queryKey">;
};

const useGenderRequirementQuery = ({
  options,
}: UseGenderRequirementQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["animal/gender-requirement"],
    queryFn: async () => {
      return animalService.getGenderRequirement();
    },
  });

  return queryResult;
};

export default useGenderRequirementQuery;