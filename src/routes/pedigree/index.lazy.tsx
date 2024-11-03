import Pedigree from "@/modules/pedigree/components/main";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/pedigree/")({
  component: () => <Pedigree />,
});
