import type { FC } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import type { MatchingResult } from ".";

const AnimalCard: FC<{
  name: string;
  code: string;
}> = ({ name, code }) => {
  return (
    <div className="mt-8">
      <div className="w-[346px] border p-6 pb-3 rounded-lg mx-auto">
        <div className="aspect-video w-full border rounded-sm" />
        <div className="text-center mt-3">
          <div className="text-sm">{name}</div>
          <div className="text-xs text-neutral-400">{code}</div>
        </div>
      </div>
    </div>
  );
};

const BreadingPanel = () => {
  return (
    <div className="grid grid-cols-2 mt-12">
      <div>
        <div className="flex items-center flex-col">
          <IoMdFemale className="text-yellow-600 text-5xl ml-1" />
          <span>Female</span>
        </div>

        <AnimalCard name="Rosalie Rosel" code="234234" />
      </div>

      <div>
        <div className="flex items-center flex-col">
          <IoMdMale className="text-green-600 text-5xl ml-1" />
          <span>Male</span>
        </div>

        <AnimalCard name="Stefanie Mayer" code="786867" />
      </div>
    </div>
  );
};

const ResultPanel: FC<{
  matchingResult: MatchingResult | undefined;
}> = ({ matchingResult }) => {
  if (!matchingResult) return <div>Result not found</div>;

  //   const hasIssues = matchingResult.issues.length > 0;

  return <div>Coming soon</div>;
};

const Panels: FC<{
  currentStep: number;
  matchingResult: MatchingResult | undefined;
}> = ({ currentStep, matchingResult }) => {
  return (
    <div>
      {currentStep === 1 && <BreadingPanel />}
      {currentStep === 2 && <ResultPanel matchingResult={matchingResult} />}
    </div>
  );
};

export default Panels;
