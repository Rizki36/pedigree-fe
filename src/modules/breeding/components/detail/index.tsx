import type { FC } from "react";
import dayjs from "dayjs";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/modules/common/components/ui/button";
import { Badge } from "@/modules/common/components/ui/badge";
import { ArrowLeftIcon, HeartIcon } from "lucide-react";

import type { BreedingRecord } from "@/modules/breeding/types";
import MainLayout from "@/modules/common/components/layouts/MainLayout";

interface BreedingDetailsPageProps {
  breedingRecord: BreedingRecord;
}

const BreedingDetailsPage: FC<BreedingDetailsPageProps> = ({
  breedingRecord,
}) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "successful":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date?: string | null) => {
    return date ? dayjs(date).format("MMM DD, YYYY") : "Not set";
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/breeding" })}
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Breeding Records
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Breeding Record Details
              </h1>
              <p className="text-gray-600 mt-1">
                Record ID: {breedingRecord.id}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <HeartIcon className="h-5 w-5 text-pink-500" />
              <h2 className="text-lg font-semibold">Basic Information</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Father
                  </span>
                  <p className="text-gray-900">
                    {breedingRecord.father?.name || "Unknown"}
                    {breedingRecord.father?.code &&
                      ` (${breedingRecord.father.code})`}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Mother
                  </span>
                  <p className="text-gray-900">
                    {breedingRecord.mother?.name || "Unknown"}
                    {breedingRecord.mother?.code &&
                      ` (${breedingRecord.mother.code})`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Breeding Date
                  </span>
                  <p className="text-gray-900">
                    {formatDate(breedingRecord.breedingDate)}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Expected Due Date
                  </span>
                  <p className="text-gray-900">
                    {formatDate(breedingRecord.expectedDueDate)}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">
                  Status
                </span>
                <div className="mt-1">
                  <Badge className={getStatusColor(breedingRecord.status)}>
                    {breedingRecord.status
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </Badge>
                </div>
              </div>

              {breedingRecord.notes && (
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Notes
                  </span>
                  <p className="text-gray-900 mt-1">{breedingRecord.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <div>
                  <p className="font-medium">Record Created</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(breedingRecord.createdAt)}
                  </p>
                </div>
              </div>

              {breedingRecord.breedingDate && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div>
                    <p className="font-medium">Breeding Date</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(breedingRecord.breedingDate)}
                    </p>
                  </div>
                </div>
              )}

              {breedingRecord.expectedDueDate && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  <div>
                    <p className="font-medium">Expected Due Date</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(breedingRecord.expectedDueDate)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                <div>
                  <p className="font-medium">Last Updated</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(breedingRecord.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BreedingDetailsPage;
