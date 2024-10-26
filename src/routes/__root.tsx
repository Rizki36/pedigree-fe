import * as React from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { createRootRouteWithContext } from "@tanstack/react-router";

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

interface MyRouterContext {
	isAuthenticated: boolean;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	notFoundComponent: () => <div>Not Found</div>,
	component: () => (
		<React.Fragment>
			<div className="p-2 flex gap-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>{" "}
				<Link to="/animals" className="[&.active]:font-bold">
					Animals
				</Link>
			</div>

			<Outlet />

			<React.Suspense>
				<TanStackRouterDevtools />
			</React.Suspense>
		</React.Fragment>
	),
});
