import type { AnimalType } from "@/modules/animalType/types";

// #region GET /v1/animal-type/list
export type GetAnimalTypeListQuery = {
  id_eq?: string;
  search?: string;
  gender_eq?: "FEMALE" | "MALE";
};
export type GetAnimalTypeListResponse = { docs: AnimalType[]; limit: number };
// #endregion
