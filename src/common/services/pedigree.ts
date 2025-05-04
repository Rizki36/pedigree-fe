import fetchInstance from "../lib/fetch-instance";
import type {
  GetPedigreeTreeQuery,
  GetPedigreeTreeResponse,
} from "./pedigree.type";

const pedigreeService = {
  getPedigreeTree: async ({
    query,
  }: {
    query?: GetPedigreeTreeQuery;
  }) => {
    return fetchInstance<GetPedigreeTreeResponse>("/v1/pedigree/tree", {
      method: "GET",
      query,
    });
  },
};

export default pedigreeService;
