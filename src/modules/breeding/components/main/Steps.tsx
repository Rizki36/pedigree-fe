import { cn } from "@/lib/utils";
import type { FC } from "react";

const Step: FC<{ label: string; isActive: boolean }> = ({
  label,
  isActive,
}) => {
  return (
    <div>
      <div
        className={cn("rounded-lg h-2 w-[100px]", {
          "bg-teal-600 ": isActive,
          "bg-gray-200": !isActive,
        })}
      />
      <div className="text-center text-xs text-neutral-700 ">{label}</div>
    </div>
  );
};
const Steps: FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-x-3">
      <Step label="Matching" isActive={currentStep >= 1} />
      <Step label="Result" isActive={currentStep >= 2} />
    </div>
  );
};

export default Steps;
