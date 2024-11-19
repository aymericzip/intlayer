'use client';

import { RegisterStepForm } from './RegisterStep';
import { VerifyEmailStepForm } from './VerifyEmailStep';
import { DefinePasswordStepForm } from './DefinePasswordStep';
import { PaymentStepForm } from './PaymentStep';
import { SetupOrganizationStepForm } from './SetUpOrganizationStep';
import { FC } from 'react';
import { useStepOrchestration } from './useStepOrchestration';
import { Steps } from './steps';
import type { Period, Plans } from '@components/PricingPage/data.content';
import { ConfirmationsStep } from './ConfirmationsStep/ConfirmationsStep';

type SignUpFormProps = {
  step: Steps;
  plan: Plans;
  period: Period;
};

export const OnboardFlow: FC<SignUpFormProps> = ({ step, plan, period }) => {
  useStepOrchestration(step);

  return (
    <>
      {step === Steps.Registration && <RegisterStepForm />}
      {step === Steps.VerifyEmail && <VerifyEmailStepForm />}
      {step === Steps.Password && <DefinePasswordStepForm />}
      {step === Steps.SetupOrganization && <SetupOrganizationStepForm />}
      {step === Steps.Payment && (
        <PaymentStepForm plan={plan} period={period} />
      )}
      {step === Steps.Confirmation && <ConfirmationsStep />}
    </>
  );
};
