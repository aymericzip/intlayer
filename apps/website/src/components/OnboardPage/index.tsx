'use client';

import { RegisterStepForm } from './RegisterStep';
import { VerifyEmailStepForm } from './VerifyEmailStep';
import { DefinePasswordStepForm } from './DefinePasswordStep';
import { PaymentStepForm } from './PaymentStep';
import { SetupOrganizationStepForm } from './SetUpOrganizationStep';
import { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import { useStepOrchestration } from './useStepOrchestration';
import { OnboardingStepIds } from './steps';

type SignUpFormProps = {
  stepId: string;
};

export const OnboardFlow: FC<SignUpFormProps> = ({ stepId }) => {
  const stepUrl = `${PagesRoutes.Onboarding}/${stepId}` as OnboardingStepIds;

  useStepOrchestration(stepUrl);

  return (
    <>
      {stepUrl === PagesRoutes.Onboarding_Registration && <RegisterStepForm />}
      {stepUrl === PagesRoutes.Onboarding_VerifyEmail && (
        <VerifyEmailStepForm />
      )}
      {stepUrl === PagesRoutes.Onboarding_Password && (
        <DefinePasswordStepForm />
      )}
      {stepUrl === PagesRoutes.Onboarding_SetupOrganization && (
        <SetupOrganizationStepForm />
      )}
      {stepUrl === PagesRoutes.Onboarding_Payment && <PaymentStepForm />}
    </>
  );
};
