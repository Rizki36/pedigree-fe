import fetchInstance from "../lib/fetch-instance";
import type {
  GetAnimalListQuery,
  GetAnimalListResponse,
  PostAddAnimalBody,
  PostAddAnimalResponse,
} from "./animal.type";

const animalService = {
  getAnimalList: async ({
    query,
  }: {
    query?: GetAnimalListQuery;
  }) => {
    return fetchInstance<GetAnimalListResponse>("/v1/animal/list", {
      method: "GET",
      query,
    });
  },
  postAddAnimal: async ({
    body,
  }: {
    body: PostAddAnimalBody;
  }) => {
    return fetchInstance<PostAddAnimalResponse>("/v1/animal", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
};

export default animalService;
