import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { AnimalGender, AnimalStatus } from "@/modules/animal/types";

export const animalsSearchSchema = z.object({
  search: fallback(z.string({ coerce: true }).optional(), undefined),
  gender: fallback(z.array(z.nativeEnum(AnimalGender)).optional(), undefined),
  status: fallback(z.array(z.nativeEnum(AnimalStatus)).optional(), undefined),
});

export type AnimalsSearchSchema = z.infer<typeof animalsSearchSchema>;

export const Route = createFileRoute("/animals/")({
  validateSearch: zodSearchValidator(animalsSearchSchema),
});
