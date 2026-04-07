import { Button } from '@intlayer/design-system/button';
import { H2 } from '@intlayer/design-system/headers';
import { useUser } from '@intlayer/design-system/hooks';
import { App_Home_Path } from '@intlayer/design-system/routes';
import { Check } from 'lucide-react';
import { useRouter } from '#/hooks/navigation';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';

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
          <span className="text-neutral text-sm">
            {confirmation.description}
          </span>
          <div className="m-auto aspect-square rounded-full bg-success/30 p-5">
            <Check className="text-success" size={50} />
          </div>
        </div>
      </StepLayout>
      <Button
        label={goToDashboardButton.label.value}
        color="text"
        Icon={Check}
        onClick={() => router.push(App_Home_Path)}
        isFullWidth
      >
        {goToDashboardButton.text}
      </Button>
    </>
  );
};
