import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";

export const animalsSearchSchema = z.object({
  search: fallback(z.string({ coerce: true }).optional(), undefined),
  gender: fallback(z.array(z.enum(["MALE", "FEMALE"])).optional(), undefined),
});

export type AnimalsSearchSchema = z.infer<typeof animalsSearchSchema>;

export const Route = createFileRoute("/animals/")({
  validateSearch: zodSearchValidator(animalsSearchSchema),
});
