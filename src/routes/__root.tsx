import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null // Render nothing in production
		: React.lazy(() =>
				// Lazy load in development
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
					// For Embedded Mode
					// default: res.TanStackRouterDevtoolsPanel
				})),
			);

export const Route = createRootRoute({
	component: () => (
		<React.Fragment>
			<div className="p-2 flex gap-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>{" "}
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
			</div>

			<Outlet />

			<React.Suspense>
				<TanStackRouterDevtools />
			</React.Suspense>
		</React.Fragment>
	),
});
