import { Button, H2, useUser } from '@intlayer/design-system';
import { Check } from 'lucide-react';
import type { FC } from 'react';
import { StepLayout } from '../StepLayout';
import { useStep } from '../useStep';
import { Steps } from '../steps';
import { useIntlayer } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import { PagesRoutes } from '@/Routes';

export const ConfirmationsStep: FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const { goPreviousStep } = useStep(Steps.Confirmation);
  const { confirmation, goToDashboardButton } =
    useIntlayer('confirmation-step');

  return (
    <>
      <StepLayout onGoToPreviousStep={goPreviousStep} hideNextButton>
        <H2>{confirmation.title}</H2>
        <div className="flex flex-col items-center justify-center gap-5 py-6">
          <span className="text-sm">
            {confirmation.hiText.value.replace(
              '{name}',
              user?.name ?? user?.email ?? ''
            )}
          </span>
          <span className="text-neutral dark:text-neutral text-sm">
            {confirmation.description}
          </span>
          <div className="bg-success/30 dark:bg-success-dark/30 m-auto aspect-square rounded-full p-5">
            <Check className="text-success dark:text-success-dark" size={50} />
          </div>
        </div>
      </StepLayout>
      <Button
        label={goToDashboardButton.label.value}
        color="text"
        Icon={Check}
        onClick={() => router.push(PagesRoutes.Dashboard)}
        isFullWidth
      >
        {goToDashboardButton.text}
      </Button>
    </>
  );
};
