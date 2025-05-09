import type { AnimalType } from "@/modules/animalType/types";

export type IsoDateString = string;

export enum AnimalGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum AnimalStatus {
  ALIVE = "ALIVE",
  DEAD = "DEAD",
}

export type Animal = {
  id: string;
  code: string;
  name: string;
  gender: AnimalGender | null;
  fatherId: string | null;
  motherId: string | null;
  animalType: AnimalType;
  note: string | null;
  dateOfBirth: IsoDateString | null;
  diedAt: IsoDateString | null;
  userId: string;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
};
