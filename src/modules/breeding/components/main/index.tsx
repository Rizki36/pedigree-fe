import Steps from "./Steps";
import { type FC, useState } from "react";
import { Button } from "@/modules/common/components/ui/button";
import Panels from "./Panels";
import MainLayout from "@/modules/common/components/layouts/MainLayout";

const Footer: FC<{
  currentStep: number;
  setCurrentStep: (step: number) => void;
  matchingResult: MatchingResult | undefined;
  handleCheckResult: () => void;
}> = ({ currentStep, setCurrentStep, matchingResult, handleCheckResult }) => {
  const hasIssues = !!matchingResult?.issues?.length;

  return (
    <div className="flex justify-center mt-[50px]">
      {currentStep === 1 && (
        <Button variant="teal" onClick={handleCheckResult}>
          Next
        </Button>
      )}

      {currentStep === 2 && (
        <>
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Back
          </Button>
          {hasIssues && <Button variant="teal">Still Breading</Button>}
          {!hasIssues && <Button variant="teal">Start Breading</Button>}
        </>
      )}
    </div>
  );
};

export type MatchingResult = {
  issues: "incest"[];
  description: string;
};

const comingSoon = true;

const Breading = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [matchingResult, setMatchingResult] = useState<
    MatchingResult | undefined
  >();

  const handleCheckResult = () => {
    // dummy check result
    setMatchingResult({
      issues: ["incest"],
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur hic quibusdam dignissimos corporis explicabo eaque nisi alias expedita corrupti ab repellat, praesentium nihil dicta iste, unde maxime non deleniti ex.",
    });
    setCurrentStep(currentStep + 1);
  };

  if (comingSoon) {
    return (
      <MainLayout>
        <div className="h-[calc(100vh-16px-24px-53px)] w-full flex items-center justify-center">
          Coming Soon
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <div className="flex justify-center my-4">
          <h1 className="text-3xl">Breading</h1>
        </div>

        <Steps currentStep={currentStep} />

        <Panels currentStep={currentStep} matchingResult={matchingResult} />

        <Footer
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          matchingResult={matchingResult}
          handleCheckResult={handleCheckResult}
        />
      </div>
    </MainLayout>
  );
};

export default Breading;
