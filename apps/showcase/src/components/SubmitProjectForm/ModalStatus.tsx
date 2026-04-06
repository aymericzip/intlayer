import { Button } from '@intlayer/design-system/button';
import { H2 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { Modal, ModalSize } from '@intlayer/design-system/modal';
import { Check, CheckCircle2, Circle, X, XCircle } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { AllStep } from './useProjectSubmit';

interface ModalStatusProps {
  submitStep: AllStep | null;
  submitError: string | null;
  onClose: () => void;
  onRetry: () => void;
  onSuccess: () => void;
}

// Ordered list used to determine which steps are done vs pending
const STEP_ORDER: AllStep[] = [
  'START',
  'SCANNING_START',
  'SCANNING_SUCCESS',
  'VERIFY_GITHUB_START',
  'VERIFY_GITHUB_SUCCESS',
  'SCREENSHOT_START',
  'SCREENSHOT_SUCCESS',
  'SUCCESS',
];

type StepStatus = 'pending' | 'active' | 'done' | 'error';

function getStepStatus(
  current: AllStep | null,
  isError: boolean,
  startStep: AllStep,
  doneStep: AllStep
): StepStatus {
  if (!current) return 'pending';

  const currentIdx = STEP_ORDER.indexOf(current);
  const startIdx = STEP_ORDER.indexOf(startStep);
  const doneIdx = STEP_ORDER.indexOf(doneStep);

  if (isError && currentIdx >= startIdx && currentIdx < doneIdx) return 'error';
  if (currentIdx >= doneIdx) return 'done';
  if (currentIdx >= startIdx) return 'active';
  return 'pending';
}

const StepIcon: FC<{ status: StepStatus }> = ({ status }) => {
  if (status === 'done')
    return <CheckCircle2 className="size-5 shrink-0 text-success" />;

  if (status === 'active')
    return <Loader isLoading className="size-5 flex-initial shrink-0" />;

  if (status === 'error')
    return <XCircle className="size-5 shrink-0 text-error" />;

  return <Circle className="size-5 shrink-0 text-neutral/30" />;
};

export const ModalStatus: FC<ModalStatusProps> = ({
  submitStep,
  submitError,
  onClose,
  onRetry,
  onSuccess,
}) => {
  const content = useIntlayer('submit-project-form');
  const isError = !!submitError || submitStep === 'ERROR';

  if (!submitStep && !submitError) return null;

  const visualSteps: {
    label: string;
    start: AllStep;
    done: AllStep;
  }[] = [
    {
      label: content.modal.steps.submit.value,
      start: 'START',
      done: 'SCANNING_START',
    },
    {
      label: content.modal.steps.verifyBundle.value,
      start: 'SCANNING_START',
      done: 'SCANNING_SUCCESS',
    },
    {
      label: content.modal.steps.verifyGithub.value,
      start: 'VERIFY_GITHUB_START',
      done: 'VERIFY_GITHUB_SUCCESS',
    },
    {
      label: content.modal.steps.screenshotAndSave.value,
      start: 'SCREENSHOT_START',
      done: 'SUCCESS',
    },
  ];

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size={ModalSize.MD}
      hasCloseButton
      disableScroll={false}
      padding="md"
    >
      <div className="flex flex-col items-center justify-center gap-5">
        {submitStep === 'SUCCESS' ? (
          <>
            <H2>{content.modal.successTitle}</H2>

            <span className="text-center text-neutral text-sm">
              {content.modal.successMessage}
            </span>
            <div className="m-auto mt-4 aspect-square rounded-full bg-success/30 p-5">
              <Check className="text-success" size={50} />
            </div>
            <Button
              color="text"
              Icon={Check}
              onClick={onSuccess}
              isFullWidth
              className="mt-6"
              label={content.modal.goToDashboardButton.value}
            >
              {content.modal.goToDashboardButton}
            </Button>
          </>
        ) : isError ? (
          <>
            <H2>{content.modal.errorTitle}</H2>
            <span className="max-w-full overflow-hidden text-clip text-center text-neutral text-sm">
              {submitError}
            </span>
            <div className="m-auto mt-4 aspect-square rounded-full bg-error/30 p-5">
              <X className="text-error" size={50} />
            </div>
            <Button
              color="text"
              Icon={X}
              onClick={onRetry}
              isFullWidth
              className="mt-6"
              label={content.modal.closeButton.value}
            >
              {content.modal.closeButton}
            </Button>
          </>
        ) : (
          <>
            <H2>{content.modal.title}</H2>
            <Loader className="size-30 text-succes" />
            <ol className="mt-2 w-full space-y-3">
              {visualSteps.map((step) => {
                const status = getStepStatus(
                  submitStep,
                  isError,
                  step.start,
                  step.done
                );
                return (
                  <li
                    key={step.start}
                    className={`flex items-center gap-3 text-sm ${
                      status === 'pending'
                        ? 'text-neutral/40'
                        : status === 'error'
                          ? 'text-error'
                          : 'text-text'
                    }`}
                  >
                    <StepIcon status={status} />
                    <span>{step.label}</span>
                  </li>
                );
              })}
            </ol>
          </>
        )}
      </div>
    </Modal>
  );
};
