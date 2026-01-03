'use client';

import type { Period, Plans } from '@components/PricingPage/data.content';
import { Loader } from '@intlayer/design-system';
import { type FC, Suspense } from 'react';
import { ConfirmationsStep } from './ConfirmationsStep/ConfirmationsStep';
import { DefinePasswordStepForm } from './DefinePasswordStep';
import { PaymentStepForm } from './PaymentStep';
import { RegisterStepForm } from './RegisterStep';
import { SetupOrganizationStepForm } from './SetUpOrganizationStep';
import { Steps } from './steps';
import { VerifyEmailStepForm } from './VerifyEmailStep';

type SignUpFormProps = {
  step: Steps;
  plan: Plans;
  period: Period;
};

export const OnboardFlow: FC<SignUpFormProps> = ({ step, plan, period }) => (
  <Suspense fallback={<Loader />}>
    {step === Steps.Registration && <RegisterStepForm />}
    {step === Steps.Password && <DefinePasswordStepForm />}
    {step === Steps.VerifyEmail && <VerifyEmailStepForm />}
    {step === Steps.SetupOrganization && <SetupOrganizationStepForm />}
    {step === Steps.Payment && <PaymentStepForm plan={plan} period={period} />}
    {step === Steps.Confirmation && <ConfirmationsStep />}
  </Suspense>
);
