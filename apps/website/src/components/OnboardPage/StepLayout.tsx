import { ButtonProps, Form } from '@intlayer/design-system';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, type ReactNode } from 'react';

type StepLayoutProps = {
  children?: ReactNode;
  onGoToNextStep?: () => void;
  onGoToPreviousStep?: () => void;
} & Pick<ButtonProps, 'disabled' | 'isLoading'>;

export const StepLayout: FC<StepLayoutProps> = ({
  children,
  onGoToNextStep,
  onGoToPreviousStep,
  ...props
}) => {
  const { nextStepButton, previousStepButton } = useIntlayer('step-layout');

  return (
    <>
      {children}
      <div className="flex w-full flex-row gap-4 py-10">
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
      </div>
    </>
  );
};
