import { createLazyFileRoute } from "@tanstack/react-router";
import Dashboard from "../modules/dashboard/components/main";

export const Route = createLazyFileRoute("/")({
  component: () => <Dashboard />,
});
