export type DateTime = string;

export type Animal = {
  id: string;
  code: string;
  name: string;
  gender: "MALE" | "FEMALE" | null;
  fatherId: string | null;
  motherId: string | null;
  animalTypeCode: string;
  note: string | null;
  dateOfBirth: DateTime | null;
  diedAt: DateTime | null;
};

export type AnimalType = {
  code: string;
  name: string;
};
