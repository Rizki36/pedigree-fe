import type { Achievement } from "@/modules/achievement/types";

// #region GET /v1/achievement/list
export type GetAchievementListQuery = {
  animal_id_eq?: string;
};
export type GetAchievementListResponse = { docs: Achievement[] };
// #endregion

// #region POST /v1/achievement
export type PostAchievementBody = {
  name: string;
  issuedBy?: string | null;
  issuedAt?: string | null;
  note?: string | null;
  animalId: string;
};
export type PostAchievementResponse = { doc: Achievement };
// #endregion

// #region DELETE /v1/achievement
export type DeleteAchievementBody = {
  id: string;
};
export type DeleteAchievementResponse = { doc: Achievement };
// #endregion

// #region PATCH /v1/achievement
export type UpdateAchievementBody = {
  id: string;
  name: string;
  issuedBy?: string | null;
  issuedAt?: string | null;
  note?: string | null;
};
export type UpdateAchievementResponse = { doc: Achievement };
// #endregion
