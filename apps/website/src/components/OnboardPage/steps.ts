import { OrganizationAPI, UserAPI } from '@intlayer/backend';
import { DefinePassword } from './DefinePasswordStep/DefinePasswordSchema';
import { VerifyEmail } from './VerifyEmailStep/VerifyEmailSchema';
import { Register } from './RegisterStep/RegisterSchema';
import { SetUpOrganization } from './SetUpOrganizationStep/SetUpOrganizationSchema';
import { Plans, Period } from '@components/PricingPage/data.content';

export enum Steps {
  Registration = 'registration',
  VerifyEmail = 'verify-email',
  Password = 'password',
  SetupOrganization = 'setup-organization',
  Payment = 'payment',
  Confirmation = 'confirmation',
}

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

export const setSessionStorageDynamicsContent = <T extends OnboardingStepIds>(
  stepId: T,
  state: Pick<OnboardingStep, 'state' | 'formData'>
): Pick<OnboardingStep, 'state' | 'formData'> => {
  sessionStorage.setItem(
    `${sessionStorageIndex}${stepId}`,
    JSON.stringify(state)
  );

  return state;
};

export const setSessionStorageDynamicsState = <T extends OnboardingStepIds>(
  stepId: T,
  state: Pick<OnboardingStep, 'state'>
): OnboardingSteps[T]['state'] => {
  const previousContent = getSessionStorageDynamicsContent(stepId);

  const newContent = {
    ...previousContent,
    state: { ...previousContent?.state, ...state },
  };

  sessionStorage.setItem(
    `${sessionStorageIndex}${stepId}`,
    JSON.stringify(newContent)
  );

  return newContent.state as OnboardingSteps[T]['state'];
};

export const setSessionStorageDynamicsFormData = <T extends OnboardingStepIds>(
  stepId: T,
  formData: Pick<OnboardingStep, 'formData'>
): OnboardingSteps[T]['formData'] => {
  const previousContent = getSessionStorageDynamicsContent(stepId);

  const newContent = {
    ...previousContent,
    formData: {
      ...previousContent?.formData,
      ...formData,
    },
  };

  sessionStorage.setItem(
    `${sessionStorageIndex}${stepId}`,
    JSON.stringify(newContent)
  );

  return newContent.formData;
};

export const isRegistrationStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(Steps.Registration)?.state;

  return Boolean(state?.user?._id);
};

export const isVerifyEmailStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(Steps.VerifyEmail)?.state;

  return state?.isEmailVerified ?? false;
};

export const isPasswordStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(Steps.Password)?.state;

  return state?.isPasswordDefined ?? false;
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
  state?: { user: UserAPI };
  formData?: Register;
};

export type VerifyEmailStep = OnboardingStep & {
  state?: { isEmailVerified: boolean };
  formData?: VerifyEmail;
};

export type DefinePasswordStep = OnboardingStep & {
  state?: { isPasswordDefined: boolean };
  formData?: DefinePassword;
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
    getNextStep: () => Steps.VerifyEmail,
    getIsValid: isRegistrationStepValid,
    state: undefined,
    formData: undefined,
  } as RegisterStep,
  [Steps.VerifyEmail]: {
    getPreviousStep: () => Steps.Registration,
    getNextStep: () => Steps.Password,
    getIsValid: isVerifyEmailStepValid,
    state: undefined,
    formData: undefined,
  } as VerifyEmailStep,
  [Steps.Password]: {
    getPreviousStep: () => Steps.VerifyEmail,
    getNextStep: () => Steps.SetupOrganization,
    getIsValid: isPasswordStepValid,
    state: undefined,
    formData: undefined,
  } as DefinePasswordStep,
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

export const sessionStorageIndex = 'onboarding-';
