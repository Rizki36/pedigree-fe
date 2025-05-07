import fetchInstance from "@/modules/common/lib/fetch-instance";
import type {
  GetAnimalTypeListQuery,
  GetAnimalTypeListResponse,
} from "./animalType.type";

const animalTypeService = {
  getAnimalTypeList: async ({
    query,
  }: {
    query?: GetAnimalTypeListQuery;
  }) => {
    return fetchInstance<GetAnimalTypeListResponse>("/v1/animal-type/list", {
      method: "GET",
      query,
    });
  },
};

export default animalTypeService;
