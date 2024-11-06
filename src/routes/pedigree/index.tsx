import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

const animalsSearchSchema = z.object({
  animalId: z.string({ coerce: true }).optional().catch(""),
});

export const Route = createFileRoute("/pedigree/")({
  validateSearch: zodSearchValidator(animalsSearchSchema),
});
