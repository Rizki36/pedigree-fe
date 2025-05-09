import { Skeleton } from "@/modules/common/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | null;
  isLoading?: boolean;
  hasError?: boolean;
};

const StatCard = ({
  title,
  value,
  isLoading = false,
  hasError = false,
}: StatCardProps) => {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-neutral-200">
      <div className="text-sm">{title}</div>
      <div className="flex items-center">
        {isLoading ? (
          <Skeleton className="h-6 w-10" />
        ) : hasError ? (
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
            <span>Error</span>
          </div>
        ) : (
          <div className="text-lg font-semibold">{value}</div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
