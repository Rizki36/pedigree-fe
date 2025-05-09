import fetchInstance from "@/modules/common/lib/fetch-instance";
import type {
  GetAnimalListQuery,
  GetAnimalListResponse,
  PostAnimalBody,
  PostAnimalResponse,
  DeleteAnimalBody,
  DeleteAnimalResponse,
  UpdateAnimalBody,
  UpdateAnimalResponse,
  GetParentRequirementResponse,
  GetGenderRequirementResponse,
  GetDobRequirementResponse,
  GetStatusDistributionResponse,
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
  postAnimal: async ({
    body,
  }: {
    body: PostAnimalBody;
  }) => {
    return fetchInstance<PostAnimalResponse>("/v1/animal", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  deleteAnimal: async ({
    body,
  }: {
    body: DeleteAnimalBody;
  }) => {
    return fetchInstance<DeleteAnimalResponse>("/v1/animal", {
      method: "DELETE",
      body: JSON.stringify(body),
    });
  },
  updateAnimal: async ({
    body,
  }: {
    body: UpdateAnimalBody;
  }) => {
    return fetchInstance<UpdateAnimalResponse>("/v1/animal", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },
  getParentRequirement: async () => {
    return fetchInstance<GetParentRequirementResponse>(
      "/v1/animal/stat/require-to-add-parent",
      {
        method: "GET",
      },
    );
  },
  getGenderRequirement: async () => {
    return fetchInstance<GetGenderRequirementResponse>(
      "/v1/animal/stat/require-to-add-gender",
      {
        method: "GET",
      },
    );
  },
  getDobRequirement: async () => {
    return fetchInstance<GetDobRequirementResponse>(
      "/v1/animal/stat/require-to-dob",
      {
        method: "GET",
      },
    );
  },
  getStatusDistribution: async () => {
    return fetchInstance<GetStatusDistributionResponse>(
      "/v1/animal/tree/status-distribution",
      {
        method: "GET",
      },
    );
  },
};

export default animalService;
