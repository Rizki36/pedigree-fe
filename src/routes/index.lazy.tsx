import { createLazyFileRoute } from "@tanstack/react-router";
import Dashboard from "../modules/dashboard/components";

export const Route = createLazyFileRoute("/")({
	component: () => <Dashboard />,
});
