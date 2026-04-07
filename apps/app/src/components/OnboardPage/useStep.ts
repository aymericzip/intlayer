'use client';

import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { formatOnboardUrl } from './formatOnboardUrl';
import { getPlanDetails } from './getPlanDetails';
import {
  type OnboardingStepIds,
  onboardingSteps,
  sessionStorageIndex,
} from './steps';

export const useStep = <T extends OnboardingStepIds>(stepId: T) => {
  type Step = (typeof onboardingSteps)[T];

  const navigate = useNavigate();
  const step = onboardingSteps[stepId] as Step;

  const { details } = useParams({ strict: false }) as { details: string[] };
  const pageDetails = getPlanDetails(details);

  const search = useSearch({ strict: false }) as Record<string, string>;
  const { origin, ...otherParams } = search;
  const [dynamicsContent, setDynamicsContent] = usePersistedStore<Pick<
    Step,
    'state' | 'formData'
  > | null>(`${sessionStorageIndex}${stepId}`, {
    state: step.state,
    formData: step.formData,
  });

  type NextUrlType = Step['getNextStep'] extends undefined ? undefined : string;

  const nextUrl: NextUrlType = (
    step.getNextStep
      ? formatOnboardUrl({
          ...pageDetails,
          origin,
          step: step.getNextStep(pageDetails),
          otherParams,
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
          otherParams,
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
            navigate({ to: nextUrl as any });
          }
        }
      : undefined
  ) as GoNextStepType;

  type GoPreviousStepType = Step['getPreviousStep'] extends undefined
    ? () => undefined
    : () => void;

  const goPreviousStep: GoPreviousStepType = (
    previousUrl
      ? () => {
          if (previousUrl) {
            navigate({ to: previousUrl as any });
          }
        }
      : origin
        ? () => navigate({ to: origin as any })
        : undefined
  ) as GoPreviousStepType;

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
