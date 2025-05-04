import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import pedigreeService from "../services/pedigree";
import type {
  GetPedigreeTreeQuery,
  GetPedigreeTreeResponse,
} from "../services/pedigree.type";

type UsePedigreeTreeQueryProps = {
  query?: GetPedigreeTreeQuery;
  options?: Omit<
    UseQueryOptions<GetPedigreeTreeResponse>,
    "queryKey" | "queryFn"
  >;
};

const usePedigreeTreeQuery = ({
  query,
  options,
}: UsePedigreeTreeQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["pedigree/tree", query],
    queryFn: async () => {
      return pedigreeService.getPedigreeTree({ query });
    },
  });

  return queryResult;
};

export default usePedigreeTreeQuery;
