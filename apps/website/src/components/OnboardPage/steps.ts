import { PagesRoutes } from '@/Routes';
import { OrganizationAPI, UserAPI } from '@intlayer/backend';
import { DefinePassword } from './DefinePasswordStep/DefinePasswordSchema';
import { VerifyEmail } from './VerifyEmailStep/VerifyEmailSchema';
import { Register } from './RegisterStep/RegisterSchema';
import { SetUpOrganization } from './SetUpOrganizationStep/SetUpOrganizationSchema';
import { Payment } from './PaymentStep/PaymentSchema';

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
  const state = getSessionStorageDynamicsContent(
    PagesRoutes.Onboarding_Registration
  )?.state;

  return Boolean(state?.user?._id);
};

export const isVerifyEmailStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(
    PagesRoutes.Onboarding_VerifyEmail
  )?.state;

  return state?.isEmailVerified ?? false;
};

export const isPasswordStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(
    PagesRoutes.Onboarding_Password
  )?.state;

  return state?.isPasswordDefined ?? false;
};

export const isSetupOrganizationStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(
    PagesRoutes.Onboarding_SetupOrganization
  )?.state;

  return Boolean(state?.organization);
};

export const isPaymentStepValid = (): boolean => {
  const state = getSessionStorageDynamicsContent(
    PagesRoutes.Onboarding_Payment
  )?.state;

  return Boolean(state?.isPaymentSuccessful);
};

export type OnboardingStep = {
  prev?: string;
  url: string;
  next?: string;

  getIsValid: () => boolean;
  goNextStep?: () => void;
  goPreviousStep?: () => void;
  isUnlocked: boolean;

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
  formData?: Payment;
};

export const onboardingSteps = {
  [PagesRoutes.Onboarding_Registration]: {
    prev: undefined,
    next: PagesRoutes.Onboarding_VerifyEmail,
    getIsValid: isRegistrationStepValid,
    state: undefined,
    formData: undefined,
  } as RegisterStep,
  [PagesRoutes.Onboarding_VerifyEmail]: {
    prev: PagesRoutes.Onboarding_Registration,
    next: PagesRoutes.Onboarding_Password,
    getIsValid: isVerifyEmailStepValid,
    state: undefined,
    formData: undefined,
  } as VerifyEmailStep,
  [PagesRoutes.Onboarding_Password]: {
    prev: PagesRoutes.Onboarding_Registration,
    next: PagesRoutes.Onboarding_SetupOrganization,
    getIsValid: isPasswordStepValid,
    state: undefined,
    formData: undefined,
  } as DefinePasswordStep,
  [PagesRoutes.Onboarding_SetupOrganization]: {
    prev: PagesRoutes.Onboarding_Password,
    next: PagesRoutes.Onboarding_Payment,
    getIsValid: isSetupOrganizationStepValid,
    state: undefined,
    formData: undefined,
  } as SetupOrganizationStep,
  [PagesRoutes.Onboarding_Payment]: {
    prev: PagesRoutes.Onboarding_SetupOrganization,
    next: PagesRoutes.Dashboard,
    getIsValid: isPaymentStepValid,
    state: undefined,
    formData: undefined,
  } as PaymentStep,
} satisfies Record<string, Omit<OnboardingStep, 'id'>>;

export type OnboardingSteps = typeof onboardingSteps;
export type OnboardingStepIds = keyof OnboardingSteps;

export const sessionStorageIndex = 'onboarding-';
