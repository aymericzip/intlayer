'use client';

import { useEffect, useState } from 'react';
import {
  getSessionStorageDynamicsContent,
  OnboardingStepIds,
  onboardingSteps,
  setSessionStorageDynamicsContent,
} from './steps';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { formatOnboardUrl } from './formatOnboardUrl';
import { getPlanDetails } from './getPlanDetails';

export const useStep = <T extends OnboardingStepIds>(stepId: T) => {
  type Step = (typeof onboardingSteps)[T];

  const router = useRouter();
  const step = onboardingSteps[stepId] as Step;

  const { details } = useParams<{ details: string[] }>();
  const pageDetails = getPlanDetails(details);
  const origin = useSearchParams().get('origin') as string | undefined;

  const [dynamicsContent, setDynamicsContent] = useState<Pick<
    Step,
    'state' | 'formData'
  > | null>(null);

  type GoNextStepType = Step['getNextStep'] extends undefined
    ? undefined
    : () => void;
  type GoPreviousStepType = Step['getPreviousStep'] extends undefined
    ? () => void | undefined
    : () => void;

  const goNextStep: GoNextStepType = (
    step.getNextStep
      ? () => {
          const nextStep = step.getNextStep?.(pageDetails);
          const url = formatOnboardUrl({
            ...pageDetails,
            step: nextStep,
          });
          router.push(url);
        }
      : undefined
  ) as GoNextStepType;

  const goPreviousStep: GoPreviousStepType = (
    step.getPreviousStep
      ? () => {
          const prevStep = step.getPreviousStep?.(pageDetails);
          const url = formatOnboardUrl({
            ...pageDetails,
            step: prevStep,
          });
          router.push(url);
        }
      : origin
        ? router.push(origin)
        : undefined
  ) as GoPreviousStepType;

  useEffect(() => {
    const sessionStorageData = getSessionStorageDynamicsContent(stepId);

    if (sessionStorageData) {
      setDynamicsContent(sessionStorageData);
    } else {
      setDynamicsContent({
        state: step.state,
        formData: step.formData,
      });
    }
  }, [stepId]);

  useEffect(() => {
    if (dynamicsContent) {
      setSessionStorageDynamicsContent(stepId, dynamicsContent);
    }
  }, [dynamicsContent, stepId]);

  const setState = (data: Partial<Step['state']>) =>
    setDynamicsContent((prev) => ({
      ...prev,

      state: {
        ...(prev?.state as Step['state']),
        ...data,
      },
    }));

  const setFormData = (data: Partial<Step['formData']>) =>
    setDynamicsContent((prev) => ({
      ...prev,
      formData: {
        ...(prev?.formData as Step['formData']),
        ...data,
      },
    }));

  return {
    ...step,
    ...dynamicsContent,

    goNextStep,
    goPreviousStep,
    setState,
    setFormData,
  };
};
