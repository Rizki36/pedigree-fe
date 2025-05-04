export type DateTime = string;

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
  dateOfBirth: DateTime | null;
  diedAt: DateTime | null;
  userId: string;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type AnimalType = {
  code: string;
  name: string;
};

export type Achievement = {
  id: string;
  name: string;
  issuedBy: string | null;
  issuedAt: string | null;
  note: string | null;
  createdAt: DateTime;
  updatedAt: DateTime;
  userId: string;
};
