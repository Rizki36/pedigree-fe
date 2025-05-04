import { Navigate, Outlet, useRouter } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";

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
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // If route requires auth and user is not authenticated, redirect to login
  if (!isPublicRoute && !isAuthenticated) {
    // Save the attempted URL for redirecting back after login
    const currentPath = router.state.location.pathname;

    return (
      <Navigate
        to="/login"
        search={{
          redirect: currentPath !== "/login" ? currentPath : undefined,
        }}
      />
    );
  }

  // Otherwise, render the route content
  return <Outlet />;
}
