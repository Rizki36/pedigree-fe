import { createLazyFileRoute } from "@tanstack/react-router";
import Login from "@/modules/auth/components/login";

const LoginPage = () => {
  return <Login />;
};

export const Route = createLazyFileRoute("/login/")({
  component: LoginPage,
});
