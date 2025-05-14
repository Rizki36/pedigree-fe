import { createLazyFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "@/modules/policy/components/PrivacyPolicy";

export const Route = createLazyFileRoute("/privacy-policy/")({
  component: PrivacyPolicy,
});
