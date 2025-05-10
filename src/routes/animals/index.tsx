import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { AnimalGender, AnimalStatus } from "@/modules/animal/types";

export const animalsSearchSchema = z.object({
  search: fallback(z.string({ coerce: true }).optional(), undefined),
  gender: fallback(
    z.enum([AnimalGender.MALE, AnimalGender.FEMALE, "OTHER"]).optional(),
    undefined,
  ),
  status: fallback(z.nativeEnum(AnimalStatus).optional(), undefined),
  pageIndex: fallback(z.number().int().min(0).optional(), 0),
});

export type AnimalsSearchSchema = z.infer<typeof animalsSearchSchema>;

export const Route = createFileRoute("/animals/")({
  validateSearch: zodSearchValidator(animalsSearchSchema),
});
