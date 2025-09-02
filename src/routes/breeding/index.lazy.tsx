import BreedingPage from "@/modules/breeding/components/main";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/breeding/")({
  component: () => <BreedingPage />,
});
