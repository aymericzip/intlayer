import { Loader } from '@intlayer/design-system/loader';
import { type FC, Suspense } from 'react';
import type { Period, Plans } from '#components/PricingPage/data.content';
import { IS_SELF_HOSTED } from '#utils/selfHosted';
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
    {/* Billing is disabled on self-hosted instances → skip the payment step. */}
    {step === Steps.Payment &&
      (IS_SELF_HOSTED ? (
        <ConfirmationsStep />
      ) : (
        <PaymentStepForm plan={plan} period={period} />
      ))}
    {step === Steps.Confirmation && <ConfirmationsStep />}
  </Suspense>
);
