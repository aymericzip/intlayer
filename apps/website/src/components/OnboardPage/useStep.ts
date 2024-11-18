'use client';

import { useEffect, useState } from 'react';
import {
  getSessionStorageDynamicsContent,
  OnboardingStepIds,
  onboardingSteps,
  setSessionStorageDynamicsContent,
} from './steps';
import { useRouter, useSearchParams } from 'next/navigation';

export const useStep = <T extends OnboardingStepIds>(stepId: T) => {
  type Step = (typeof onboardingSteps)[T];

  const router = useRouter();
  const step = onboardingSteps[stepId] as Step;
  const origin = useSearchParams().get('origin') as string | undefined;
  const [dynamicsContent, setDynamicsContent] = useState<Pick<
    Step,
    'state' | 'formData'
  > | null>(null);

  type GoNextStepType = Step['next'] extends undefined ? undefined : () => void;
  type GoPreviousStepType = Step['prev'] extends undefined
    ? () => void | undefined
    : () => void;

  const goNextStep: GoNextStepType =
    (step.goNextStep as GoNextStepType) ??
    ((step.next
      ? () => {
          router.push(step.next!);
        }
      : undefined) as GoNextStepType);

  const goPreviousStep: GoPreviousStepType = (
    ((step.goPreviousStep as GoPreviousStepType) ?? step.prev)
      ? () => router.push(step.prev!)
      : origin
        ? () => router.push(origin)
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
