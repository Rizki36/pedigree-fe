import { AnimalGender, AnimalStatus } from "@/modules/animal/types";
import MainLayout from "@/modules/common/components/layouts/MainLayout";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import TreeNode from "./TreeNode";
import type { TreeNodeItem } from "../../types";
import StatCard from "./StatCard";
import useParentRequirementQuery from "@/modules/animal/hooks/queries/useParentRequirementQuery";
import useGenderRequirementQuery from "@/modules/animal/hooks/queries/useGenderRequirementQuery";
import useDobRequirementQuery from "@/modules/animal/hooks/queries/useDobRequirementQuery";
import useStatusDistributionQuery from "@/modules/animal/hooks/queries/useStatusDistributionQuery";
import { generateServiceErrorMessage } from "@/modules/common/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/components/ui/tooltip";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/modules/common/components/ui/skeleton";

// Pastel color palette
const colors = {
  root: "#FFFFFF",
  male: "#BFDBFE", // pastel blue
  female: "#FBE3E4", // pastel pink
  other: "#E5E7EB", // pastel gray for "Other"
  alive: "#BBF7D0", // pastel green
  dead: "#FECACA", // pastel red
};

const Dashboard = () => {
  const {
    data: parentRequirementData,
    isLoading: isParentRequirementLoading,
    error: parentRequirementError,
  } = useParentRequirementQuery({});

  const {
    data: genderRequirementData,
    isLoading: isGenderRequirementLoading,
    error: genderRequirementError,
  } = useGenderRequirementQuery({});

  const {
    data: dobRequirementData,
    isLoading: isDobRequirementLoading,
    error: dobRequirementError,
  } = useDobRequirementQuery({});

  const {
    data: statusDistributionData,
    isLoading: isStatusDistributionLoading,
    error: statusDistributionError,
  } = useStatusDistributionQuery({});

  // Calculate total animal count
  const totalAnimalCount =
    (statusDistributionData?.doc.maleCount.total || 0) +
    (statusDistributionData?.doc.femaleCount.total || 0) +
    (statusDistributionData?.doc.otherCount.total || 0);

  const animalData: TreeNodeItem = {
    label: "Total Animal",
    value: isStatusDistributionLoading ? 0 : totalAnimalCount,
    color: colors.root,
    linkProps: {
      to: "/animals",
    },
    children: [
      {
        label: "Male",
        value: isStatusDistributionLoading
          ? 0
          : statusDistributionData?.doc.maleCount.total || 0,
        color: colors.male,
        children: [
          {
            label: "Dead",
            value: isStatusDistributionLoading
              ? 0
              : statusDistributionData?.doc.maleCount.dead || 0,
            color: colors.dead,
            linkProps: {
              to: "/animals",
              search: {
                gender: AnimalGender.MALE,
                status: AnimalStatus.DEAD,
              },
            },
          },
          {
            label: "Alive",
            value: isStatusDistributionLoading
              ? 0
              : statusDistributionData?.doc.maleCount.alive || 0,
            color: colors.alive,
            linkProps: {
              to: "/animals",
              search: {
                gender: AnimalGender.MALE,
                status: AnimalStatus.ALIVE,
              },
            },
          },
        ],
        linkProps: {
          to: "/animals",
          search: {
            gender: AnimalGender.MALE,
          },
        },
      },
      {
        label: "Female",
        value: isStatusDistributionLoading
          ? 0
          : statusDistributionData?.doc.femaleCount.total || 0,
        color: colors.female,
        children: [
          {
            label: "Dead",
            value: isStatusDistributionLoading
              ? 0
              : statusDistributionData?.doc.femaleCount.dead || 0,
            color: colors.dead,
            linkProps: {
              to: "/animals",
              search: {
                gender: AnimalGender.FEMALE,
                status: AnimalStatus.DEAD,
              },
            },
          },
          {
            label: "Alive",
            value: isStatusDistributionLoading
              ? 0
              : statusDistributionData?.doc.femaleCount.alive || 0,
            color: colors.alive,
            linkProps: {
              to: "/animals",
              search: {
                gender: AnimalGender.FEMALE,
                status: AnimalStatus.ALIVE,
              },
            },
          },
        ],
        linkProps: {
          to: "/animals",
          search: {
            gender: AnimalGender.FEMALE,
          },
        },
      },
      {
        label: "Other",
        value: isStatusDistributionLoading
          ? 0
          : statusDistributionData?.doc.otherCount.total || 0,
        color: colors.other,
        children: [
          {
            label: "Dead",
            value: isStatusDistributionLoading
              ? 0
              : statusDistributionData?.doc.otherCount.dead || 0,
            color: colors.dead,
            linkProps: {
              to: "/animals",
              search: {
                gender: "OTHER",
                status: AnimalStatus.DEAD,
              },
            },
          },
          {
            label: "Alive",
            value: isStatusDistributionLoading
              ? 0
              : statusDistributionData?.doc.otherCount.alive || 0,
            color: colors.alive,
            linkProps: {
              to: "/animals",
              search: {
                gender: "OTHER",
                status: AnimalStatus.ALIVE,
              },
            },
          },
        ],
        linkProps: {
          to: "/animals",
          search: {
            gender: "OTHER",
          },
        },
      },
    ],
  };

  // Generate error messages
  const parentRequirementErrorMessage = parentRequirementError
    ? generateServiceErrorMessage(parentRequirementError)
    : "";

  const genderRequirementErrorMessage = genderRequirementError
    ? generateServiceErrorMessage(genderRequirementError)
    : "";

  const dobRequirementErrorMessage = dobRequirementError
    ? generateServiceErrorMessage(dobRequirementError)
    : "";

  const statusDistributionErrorMessage = statusDistributionError
    ? generateServiceErrorMessage(statusDistributionError)
    : "";

  return (
    <MainLayout>
      <div className="flex gap-6">
        <div className="flex justify-center w-full bg-neutral-100 rounded-2xl pt-12 pb-8 px-4 border border-neutral-200 relative h-[600px]">
          <div className="absolute top-4 left-[50%] transform -translate-x-1/2 z-40 flex items-center">
            Animal Distribution
            {statusDistributionError && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="ml-2 h-4 w-4 text-red-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {statusDistributionErrorMessage}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {isStatusDistributionLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="w-[400px]">
                <Skeleton className="h-16 w-full mb-8 rounded-lg" />
                <div className="flex justify-between gap-8">
                  <div className="w-1/2">
                    <Skeleton className="h-12 w-full mb-4 rounded-lg" />
                    <div className="flex gap-4">
                      <Skeleton className="h-10 w-full rounded-lg" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <Skeleton className="h-12 w-full mb-4 rounded-lg" />
                    <div className="flex gap-4">
                      <Skeleton className="h-10 w-full rounded-lg" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <TransformWrapper
              initialScale={0.8}
              centerOnInit={true}
              maxScale={99999}
              minScale={0.1}
            >
              {() => (
                <TransformComponent
                  wrapperStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <TreeNode node={animalData} />
                </TransformComponent>
              )}
            </TransformWrapper>
          )}
        </div>

        <div className="w-96">
          <div className="text-center mb-3 flex items-center justify-center">
            Action Needed
            {(parentRequirementError ||
              genderRequirementError ||
              dobRequirementError) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="ml-2 h-4 w-4 text-red-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {parentRequirementError
                      ? parentRequirementErrorMessage
                      : genderRequirementError
                        ? genderRequirementErrorMessage
                        : dobRequirementErrorMessage}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <StatCard
              title="Need to add gender"
              value={
                isGenderRequirementLoading
                  ? null
                  : (genderRequirementData?.doc.count ?? 0)
              }
              isLoading={isGenderRequirementLoading}
              hasError={!!genderRequirementError}
            />

            <StatCard
              title="Need to add date of birth"
              value={
                isDobRequirementLoading
                  ? null
                  : (dobRequirementData?.doc.count ?? 0)
              }
              isLoading={isDobRequirementLoading}
              hasError={!!dobRequirementError}
            />

            <StatCard
              title="Need to add father"
              value={
                isParentRequirementLoading
                  ? null
                  : (parentRequirementData?.doc.father ?? 0)
              }
              isLoading={isParentRequirementLoading}
              hasError={!!parentRequirementError}
            />

            <StatCard
              title="Need to add mother"
              value={
                isParentRequirementLoading
                  ? null
                  : (parentRequirementData?.doc.mother ?? 0)
              }
              isLoading={isParentRequirementLoading}
              hasError={!!parentRequirementError}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
