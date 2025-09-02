import { createFileRoute } from "@tanstack/react-router";

import CreateBreedingForm from "@/modules/breeding/components/form/CreateBreedingForm";
import MainLayout from "@/modules/common/components/layouts/MainLayout";

export const Route = createFileRoute("/breeding/new")({
  component: NewBreeding,
});

function NewBreeding() {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Breeding Record
          </h1>
          <p className="text-gray-600 mt-2">
            Create a new breeding record with AI-powered compatibility analysis
            and recommendations.
          </p>
        </div>

        <CreateBreedingForm />
      </div>
    </MainLayout>
  );
}
