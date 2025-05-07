import { createLazyFileRoute } from "@tanstack/react-router";
import AnimalDetail from "@/modules/animal/components/detail";

export const Route = createLazyFileRoute("/animals/$animalId/")({
  component: () => <AnimalDetail />,
});
