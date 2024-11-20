'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatOnboardUrl } from './formatOnboardUrl';
import { getPlanDetails } from './getPlanDetails';
import {
  getSessionStorageDynamicsContent,
  OnboardingStepIds,
  onboardingSteps,
  setSessionStorageDynamicsContent,
} from './steps';

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

  type NextUrlType = Step['getNextStep'] extends undefined ? undefined : string;

  const nextUrl: NextUrlType = (
    step.getNextStep
      ? formatOnboardUrl({
          ...pageDetails,
          origin,
          step: step.getNextStep(pageDetails),
        })
      : undefined
  ) as NextUrlType;

  type PreviousUrlType = Step['getPreviousStep'] extends undefined
    ? undefined
    : string;

  const previousUrl: PreviousUrlType = (
    step.getPreviousStep
      ? formatOnboardUrl({
          ...pageDetails,
          origin,
          step: step.getPreviousStep(pageDetails),
        })
      : undefined
  ) as PreviousUrlType;

  type GoNextStepType = Step['getNextStep'] extends undefined
    ? undefined
    : () => void;

  const goNextStep: GoNextStepType = (
    nextUrl
      ? () => {
          if (nextUrl) {
            router.push(nextUrl);
          }
        }
      : undefined
  ) as GoNextStepType;

  type GoPreviousStepType = Step['getPreviousStep'] extends undefined
    ? () => void | undefined
    : () => void;

  const goPreviousStep: GoPreviousStepType = (
    previousUrl
      ? () => {
          if (previousUrl) {
            router.push(previousUrl);
          }
        }
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
    nextUrl,
    previousUrl,
    goNextStep,
    goPreviousStep,
    setState,
    setFormData,
  };
};
