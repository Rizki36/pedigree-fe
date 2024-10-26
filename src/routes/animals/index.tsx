import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";

const animalsSearchSchema = z.object({
	search: z.string({ coerce: true }).optional().catch(undefined),
	gender: z.enum(["male", "female"]).optional().catch(undefined),
});

export const Route = createFileRoute("/animals/")({
	validateSearch: zodSearchValidator(animalsSearchSchema),
});
