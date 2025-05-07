export type IsoDateString = string;

export enum AnimalGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export type Animal = {
  id: string;
  code: string;
  name: string;
  gender: AnimalGender | null;
  fatherId: string | null;
  motherId: string | null;
  animalTypeCode: string;
  note: string | null;
  dateOfBirth: IsoDateString | null;
  diedAt: IsoDateString | null;
  userId: string;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
};

