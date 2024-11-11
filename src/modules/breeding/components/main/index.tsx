import MainLayout from "@/common/layouts/MainLayout";
import Steps from "./Steps";
import { type FC, useState } from "react";
import { Button } from "@/common/components/ui/button";
import Panels from "./Panels";

const Footer: FC<{
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleCheckResult: () => void;
}> = ({ currentStep, setCurrentStep, handleCheckResult }) => {
  return (
    <div className="flex justify-center mt-[90px]">
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
          <Button variant="teal">Start Breading</Button>
        </>
      )}
    </div>
  );
};

export type MatchingResult = {
  issues: "incest"[];
  description: string;
};

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
          handleCheckResult={handleCheckResult}
        />
      </div>
    </MainLayout>
  );
};

export default Breading;
