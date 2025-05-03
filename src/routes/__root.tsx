import * as React from "react";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { Toaster } from "@/common/components/ui/sonner";
import { RouteGuard } from "../components/RouteGuard";
import type { AuthContextType } from "@/contexts/AuthContext";

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
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <React.Fragment>
      <RouteGuard />

      <Toaster />

      <React.Suspense>
        <TanStackRouterDevtools position="bottom-left" />
      </React.Suspense>
    </React.Fragment>
  ),
});
