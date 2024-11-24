import type { Animal } from "../types";

export type GetAnimalListQuery = {
  id_eq?: string;
  search?: string;
  gender_eq?: "FEMALE" | "MALE";
};
export type GetAnimalListResponse = { docs: Animal[]; limit: number };

export type PostAddAnimalBody = {
  code: string;
  name: string;
};
export type PostAddAnimalResponse = { doc: Animal };
