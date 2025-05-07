import { createLazyFileRoute } from "@tanstack/react-router";
import Animals from "@/modules/animal/components/main";

export const Route = createLazyFileRoute("/animals/")({
  component: () => <Animals />,
});
