import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { OnboardingStepIds, onboardingSteps } from './steps';

export const useStepOrchestration = <T extends OnboardingStepIds>(
  currentStepId: T
) => {
  const router = useRouter();

  useEffect(() => {
    const path = getPathToStep(currentStepId);

    for (const stepId of path) {
      const step = onboardingSteps[stepId];

      if (!step.getIsValid()) {
        if (stepId !== currentStepId) {
          router.replace(step.url);
        }
        break;
      }
    }
  }, [currentStepId, router]);
};

const getPathToStep = <T extends OnboardingStepIds>(stepId: T): T[] => {
  const path: T[] = [];
  let currentId: T | undefined = stepId;

  while (currentId) {
    path.unshift(currentId);
    const prev = onboardingSteps[currentId].prev;

    if (prev) {
      currentId = prev as T;
    } else {
      currentId = undefined;
    }
  }

  return path;
};
