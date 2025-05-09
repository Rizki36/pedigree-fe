import { Outlet, useRouter } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const publicRoutes = ["/login"];

export function RouteGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Check if the current route is marked as public
  const isPublicRoute = publicRoutes.some((route) => {
    const currentPath = router.state.location.pathname;
    return currentPath.startsWith(route);
  });

  // If still loading auth state, show a loading indicator
  if (isLoading) {
    return (
      <div
        data-testid="loading-route-guard"
        className="flex items-center justify-center min-h-screen"
      >
        Loading...
      </div>
    );
  }

  useEffect(() => {
    // If route requires auth and user is not authenticated, redirect to login
    if (!isPublicRoute && !isAuthenticated) {
      // Save the attempted URL for redirecting back after login
      const currentPath = router.state.location.pathname;

      // Redirect to login page
      router.navigate({
        to: "/login",
        search: { redirectTo: currentPath },
      });
    }
  }, [isPublicRoute, isAuthenticated, router]);

  // Otherwise, render the route content
  return <Outlet />;
}
