import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/breeding/$breedingId/")({
  loader: ({ params }) => {
    return {
      breedingId: params.breedingId,
    };
  },
});
