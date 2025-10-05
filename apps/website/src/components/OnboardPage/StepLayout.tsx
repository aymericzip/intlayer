import { type ButtonProps, Form } from '@intlayer/design-system';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';

type StepLayoutProps = {
  children?: ReactNode;
  isSkippable?: boolean;
  onGoToNextStep?: () => void;
  onGoToPreviousStep?: () => void;
  onSkipStep?: () => void;
  hideNextButton?: boolean;
} & Pick<ButtonProps, 'disabled' | 'isLoading'>;

export const StepLayout: FC<StepLayoutProps> = ({
  children,
  onGoToNextStep,
  onGoToPreviousStep,
  isSkippable = false,
  onSkipStep,
  hideNextButton = false,
  ...props
}) => {
  const { nextStepButton, previousStepButton, skipButton } =
    useIntlayer('step-layout');

  return (
    <>
      {children}
      <div className="flex w-full flex-col gap-2 pb-3 pt-10">
        <div className="flex w-full gap-4">
          {onGoToPreviousStep && (
            <Form.Button
              label={previousStepButton.label.value}
              onClick={onGoToPreviousStep}
              color="text"
              variant="outline"
              isFullWidth
              Icon={ChevronLeft}
            >
              {previousStepButton.text}
            </Form.Button>
          )}
          {!hideNextButton && (
            <Form.Button
              {...props}
              label={nextStepButton.label.value}
              onClick={onGoToNextStep}
              type="submit"
              color="text"
              textAlign="center"
              isFullWidth
              IconRight={ChevronRight}
            >
              {nextStepButton.text}
            </Form.Button>
          )}
        </div>
        {isSkippable && onSkipStep && (
          <Form.Button
            label={skipButton.label.value}
            onClick={onSkipStep}
            color="text"
            textAlign="center"
            className="ml-auto"
            variant="link"
            IconRight={ChevronRight}
          >
            {skipButton.text}
          </Form.Button>
        )}
      </div>
    </>
  );
};
