'use client';
export default function AnalyzerLoading({
  progress,
  currentStep,
}: {
  progress: number;
  currentStep: string;
}) {
  return (
    <div className="mt-8 w-full max-w-lg">
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700">
        <div
          className="h-3 animate-pulse bg-gradient-to-r from-[#C8EB3E] to-[#A3C62D] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 animate-pulse text-center text-gray-600 text-sm dark:text-gray-300">
        {currentStep}
      </p>
    </div>
  );
}
