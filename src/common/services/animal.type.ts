import type { Animal } from "../types";

// #region GET /v1/animal/list
export type GetAnimalListQuery = {
  id_eq?: string;
  id_ne?: string;
  animal_type_code_eq?: string;
  search?: string;
  gender_eq?: "FEMALE" | "MALE";
};
export type GetAnimalListResponse = { docs: Animal[]; limit: number };
// #endregion

// #region POST /v1/animal
export type PostAnimalBody = {
  code: string;
  name: string;
  animalTypeCode: string;
};
export type PostAnimalResponse = { doc: Animal };
// #endregion

// #region DELETE /v1/animal
export type DeleteAnimalBody = {
  id: string;
};
export type DeleteAnimalResponse = { doc: Animal };
// #endregion

// #region PATCH /v1/animal
export type UpdateAnimalBody = {
  id: string;
  code?: string;
  name?: string;
  animalTypeCode?: string;
  dateOfBirth?: string | null;
  diedAt?: string | null;
  fatherId?: string | null;
  motherId?: string | null;
};
export type UpdateAnimalResponse = { doc: Animal };
// #endregion
