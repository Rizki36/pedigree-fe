import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

const animalDetailSearchSchema = z.object({});

export type AnimalDetailSearchSchema = z.infer<typeof animalDetailSearchSchema>;

export const Route = createFileRoute("/animals/$animalId/")({
  validateSearch: zodSearchValidator(animalDetailSearchSchema),
});
