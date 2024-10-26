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
			<Outlet />

			<React.Suspense>
				<TanStackRouterDevtools position="bottom-right" />
			</React.Suspense>
		</React.Fragment>
	),
});
