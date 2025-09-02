import BreedingDetailsPage from "@/modules/breeding/components/detail";
import useBreedingRecordQuery from "@/modules/breeding/hooks/queries/useBreedingRecordQuery";
import { createFileRoute } from "@tanstack/react-router";
import { notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/breeding/$breedingId")({
  component: BreedingDetails,
  loader: async ({ params }) => {
    // Validate that breedingId exists
    if (!params.breedingId) {
      throw notFound();
    }
    return null;
  },
});

function BreedingDetails() {
  const { breedingId } = Route.useParams();

  const {
    data: breedingData,
    isLoading,
    error,
  } = useBreedingRecordQuery({
    breedingId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-40 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error || !breedingData?.doc) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Breeding Record Not Found
          </h1>
          <p className="text-gray-600">
            The breeding record you're looking for doesn't exist or you don't
            have permission to view it.
          </p>
        </div>
      </div>
    );
  }

  return <BreedingDetailsPage breedingRecord={breedingData.doc} />;
}
