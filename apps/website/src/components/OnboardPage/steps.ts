import { type Period, Plans } from '@components/PricingPage/data.content';
import type { OrganizationAPI, UserAPI } from '@intlayer/backend';
import type { Register } from './RegisterStep/useRegisterSchema';
import type { SetUpOrganization } from './SetUpOrganizationStep/useSetUpOrganizationSchema';
import type { VerifyEmail } from './VerifyEmailStep/VerifyEmailSchema';

export enum Steps {
  Registration = 'registration',
  VerifyEmail = 'verify-email',
  Password = 'password',
  SetupOrganization = 'setup-organization',
  Payment = 'payment',
  Confirmation = 'confirmation',
}

export const sessionStorageIndex = 'onboarding-';

export const getSessionStorageDynamicsContent = <T extends OnboardingStepIds>(
  stepId: T
): OnboardingSteps[T] | null => {
  const sessionStorageData = sessionStorage.getItem(
    `${sessionStorageIndex}${stepId}`
  );

  if (sessionStorageData) {
    return JSON.parse(sessionStorageData);
  }

  return null;
};

export const isRegistrationStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(Steps.Registration)?.state;

  return Boolean(state?.email);
};

export const isVerifyEmailStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(Steps.VerifyEmail)?.state;

  return state?.isEmailVerified ?? false;
};

export const isPasswordStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(Steps.Password)?.state;

  return Boolean(state?.user?.id);
};

export const isSetupOrganizationStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(
    Steps.SetupOrganization
  )?.state;

  return Boolean(state?.organization);
};

export const isPaymentStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(Steps.Payment)?.state;

  return Boolean(state?.isPaymentSuccessful);
};

export type OnboardingStep = {
  getPreviousStep?: (details: {
    step?: Steps;
    plan?: Plans;
    period?: Period;
  }) => Steps;
  getNextStep?: (details: {
    step?: Steps;
    plan?: Plans;
    period?: Period;
  }) => Steps;

  getIsValid: () => boolean;

  state?: unknown;
  formData?: unknown;
};

export type RegisterStep = OnboardingStep & {
  state?: Register;
  formData?: Register;
};

export type VerifyEmailStep = OnboardingStep & {
  state?: { isEmailVerified: boolean };
  formData?: VerifyEmail;
};

export type DefinePasswordStep = OnboardingStep & {
  state?: { user: UserAPI };
};

export type SetupOrganizationStep = OnboardingStep & {
  state?: { organization: OrganizationAPI };
  formData?: SetUpOrganization;
};

export type PaymentStep = OnboardingStep & {
  state?: {
    sessionId: string;
    customerId: string;
    isPaymentSuccessful: boolean;
  };
  formData?: undefined;
};

export const onboardingSteps = {
  [Steps.Registration]: {
    getNextStep: () => Steps.Password,
    getIsValid: isRegistrationStepValid,
    state: undefined,
    formData: undefined,
  } as RegisterStep,
  [Steps.Password]: {
    getPreviousStep: () => Steps.Registration,
    getNextStep: () => Steps.VerifyEmail,
    getIsValid: isPasswordStepValid,
    state: undefined,
    formData: undefined,
  } as DefinePasswordStep,
  [Steps.VerifyEmail]: {
    getPreviousStep: () => Steps.Password,
    getNextStep: () => Steps.SetupOrganization,
    getIsValid: isVerifyEmailStepValid,
    state: undefined,
    formData: undefined,
  } as VerifyEmailStep,
  [Steps.SetupOrganization]: {
    getPreviousStep: () => Steps.Password,
    getNextStep: ({ plan }) => {
      if (plan === Plans.Free) {
        return Steps.Confirmation;
      }
      return Steps.Payment;
    },
    getIsValid: isSetupOrganizationStepValid,
    state: undefined,
    formData: undefined,
  } as SetupOrganizationStep,
  [Steps.Payment]: {
    getPreviousStep: () => Steps.SetupOrganization,
    getNextStep: () => Steps.Confirmation,
    getIsValid: isPaymentStepValid,
    state: undefined,
    formData: undefined,
  } as PaymentStep,
  [Steps.Confirmation]: {
    getPreviousStep: ({ plan }) => {
      if (plan === Plans.Free) {
        return Steps.SetupOrganization;
      }
      return Steps.Payment;
    },
    getIsValid: isPaymentStepValid,
    state: undefined,
    formData: undefined,
  } as PaymentStep,
} satisfies Record<string, Omit<OnboardingStep, 'id'>>;

export type OnboardingSteps = typeof onboardingSteps;
export type OnboardingStepIds = keyof OnboardingSteps;
