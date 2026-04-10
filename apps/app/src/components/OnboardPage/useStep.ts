import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useParams, useSearch } from '@tanstack/react-router';
import type { Period, Plans } from '#components/PricingPage/data.content';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate';
import { formatOnboardUrl } from './formatOnboardUrl';
import {
  type OnboardingStepIds,
  onboardingSteps,
  type Steps,
  sessionStorageIndex,
} from './steps';

export const useStep = <T extends OnboardingStepIds>(stepId: T) => {
  type Step = (typeof onboardingSteps)[T];

  const navigate = useLocalizedNavigate();
  const stepConfig = onboardingSteps[stepId] as Step;

  // 1. Extract step from path
  const { step } = useParams({ strict: false }) as { step: string };

  // 2. Extract plan, period, origin, and other params from search query
  const search = useSearch({ strict: false }) as Record<string, string>;
  const { origin, plan, period, ...otherParams } = search;

  // 3. Construct pageDetails manually using the correct sources
  const pageDetails = {
    step: step as Steps,
    plan: plan as Plans,
    period: period as Period,
  };

  const [dynamicsContent, setDynamicsContent] = usePersistedStore<Pick<
    Step,
    'state' | 'formData'
  > | null>(`${sessionStorageIndex}${stepId}`, {
    state: stepConfig.state,
    formData: stepConfig.formData,
  });

  type NextUrlType = Step['getNextStep'] extends undefined ? undefined : string;

  const nextUrl: NextUrlType = (
    stepConfig.getNextStep
      ? formatOnboardUrl({
          ...pageDetails,
          origin,
          step: stepConfig.getNextStep(pageDetails),
          otherParams,
        })
      : undefined
  ) as NextUrlType;

  type PreviousUrlType = Step['getPreviousStep'] extends undefined
    ? undefined
    : string;

  const previousUrl: PreviousUrlType = (
    stepConfig.getPreviousStep
      ? formatOnboardUrl({
          ...pageDetails,
          origin,
          step: stepConfig.getPreviousStep(pageDetails),
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
        ...(typeof prev?.formData === 'object' ? prev?.formData : {}),
        ...data,
      },
    }));

  return {
    ...stepConfig,
    ...dynamicsContent,
    nextUrl,
    previousUrl,
    goNextStep,
    goPreviousStep,
    setState,
    setFormData,
  };
};
