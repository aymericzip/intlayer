import type { FC } from 'react';

type AnalyzerLoadingProps = {
  progress: number;
  currentStep: string;
};

export const AnalyzerLoading: FC<AnalyzerLoadingProps> = ({
  progress,
  currentStep,
}) => (
  <div className="mt-8 w-full max-w-lg">
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700">
      <div
        className="h-2 animate-pulse rounded-full bg-linear-to-r from-[#C8EB3E] to-[#A3C62D] transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
    <p className="mt-3 animate-pulse text-center text-neutral text-sm">
      {currentStep}
    </p>
  </div>
);
