import type { Animal, AnimalGender } from "../types";

// #region GET /v1/animal/list
export type GetAnimalListQuery = {
  id_eq?: string;
  id_ne?: string;
  animal_type_code_eq?: string;
  search?: string;
  gender_eq?: "FEMALE" | "MALE" | "OTHER";
  status_eq?: "ALIVE" | "DEAD";
  limit?: number;
  cursor?: string;
  skip?: number;
};

export type GetAnimalListResponse = {
  docs: Animal[];
  limit: number;
  nextCursor?: string; // cursor-based pagination
  hasMore: boolean;
};
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

// #region GET /v1/animal/stat/require-to-add-dob
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
