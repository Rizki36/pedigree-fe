import type { IsoDateString } from "@/modules/animal/types";

export type Achievement = {
  id: string;
  name: string;
  issuedBy: string | null;
  issuedAt: string | null;
  note: string | null;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
  userId: string;
};
