import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { BreedingStatus } from "@/modules/breeding/types";


export const breedingSearchSchema = z.object({
  search: fallback(z.string({ coerce: true }).optional(), undefined),
  status: fallback(z.nativeEnum(BreedingStatus).optional(), undefined),
  fatherId: fallback(z.string().optional(), undefined),
  motherId: fallback(z.string().optional(), undefined),
  pageIndex: fallback(z.number().int().min(0).optional(), 0),
});

export type BreedingSearchSchema = z.infer<typeof breedingSearchSchema>;

export const Route = createFileRoute("/breeding/")({
  validateSearch: zodSearchValidator(breedingSearchSchema),
});
