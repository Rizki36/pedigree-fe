export type DateTime = string;

export type Animal = {
  id: string;
  code: string;
  name: string;
  gender?: "MALE" | "FEMALE";
  fatherId?: string;
  motherId?: string;
  note?: string;
  dateOfBirth?: DateTime;
  diedAt?: DateTime;
};
