import type { AnimalType } from "@/modules/animalType/types";
import type { Animal, AnimalGender, AnimalStatus } from "../types";

// #region GET /v1/animal/list
export type GetAnimalListQuery = {
  id_eq?: string;
  id_ne?: string;
  animal_type_eq?: AnimalType;
  search?: string;
  gender_eq?: AnimalGender | "OTHER";
  status_eq?: AnimalStatus; // Add status_eq parameter
};
export type GetAnimalListResponse = { docs: Animal[]; limit: number };
// #endregion

// #region POST /v1/animal
export type PostAnimalBody = {
  code: string;
  name: string;
  animalTypeCode: string;
  gender: AnimalGender | null;
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
  note?: string | null;
  gender?: AnimalGender | null;
};
export type UpdateAnimalResponse = { doc: Animal };
// #endregion

// #region GET /v1/animal/stat/require-to-add-parent
export type GetParentRequirementResponse = {
  doc: {
    father: number;
    mother: number;
  };
};
// #endregion

// #region GET /v1/animal/stat/require-to-add-gender
export type GetGenderRequirementResponse = {
  doc: {
    count: number;
  };
};
// #endregion

// #region GET /v1/animal/stat/require-to-dob
export type GetDobRequirementResponse = {
  doc: {
    count: number;
  };
};
// #endregion

// #region GET /v1/tree/status-distribution
export type GetStatusDistributionResponse = {
  doc: {
    maleCount: {
      total: number;
      alive: number;
      dead: number;
    };
    femaleCount: {
      total: number;
      alive: number;
      dead: number;
    };
    otherCount: {
      total: number;
      alive: number;
      dead: number;
    };
  };
};
// #endregion
