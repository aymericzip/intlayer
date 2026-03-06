import { Button, H2, Loader, Modal, ModalSize } from '@intlayer/design-system';
import { Check, X } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { SubmitStep } from '@/server/projectActions/types';

interface ModalStatusProps {
  submitStep: SubmitStep | null;
  submitError: string | null;
  onClose: () => void;
  onRetry: () => void;
  onSuccess: () => void;
  hasGithubUrl: boolean;
}

export const ModalStatus: FC<ModalStatusProps> = ({
  submitStep,
  submitError,
  onClose,
  onRetry,
  onSuccess,
  hasGithubUrl,
}) => {
  const content = useIntlayer('submit-project-form');

  if (!submitStep && !submitError) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size={ModalSize.MD}
      hasCloseButton
      disableScroll={false} // Can be removed on intlayer >=8.1.12
    >
      <div className="flex flex-col items-center justify-center gap-5 px-4 py-6">
        {submitError ? (
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
        ) : submitStep === 'SUCCESS' ? (
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
        ) : (
          <>
            <H2>{content.modal.title}</H2>
            <Loader isLoading={true} />
            <div className="my-4 flex w-full max-w-md flex-col gap-4 border-l border-l-neutral/30 pl-4">
              <ul className="space-y-3 text-neutral text-sm">
                <StepItem
                  label={content.modal.steps.verifyBundle.value}
                  isCurrent={submitStep === 'SCANNING_START'}
                  isWaiting={submitStep === 'START'}
                />

                {hasGithubUrl && (
                  <StepItem
                    label={content.modal.steps.verifyGithub.value}
                    isCurrent={submitStep === 'VERIFY_GITHUB_START'}
                    isWaiting={[
                      'START',
                      'SCANNING_START',
                      'SCANNING_SUCCESS',
                    ].includes(submitStep as string)}
                  />
                )}

                <StepItem
                  label={content.modal.steps.screenshotAndSave.value}
                  isCurrent={submitStep === 'DB_SCREENSHOT_START'}
                  isWaiting={[
                    'START',
                    'SCANNING_START',
                    'SCANNING_SUCCESS',
                    'VERIFY_GITHUB_START',
                    'VERIFY_GITHUB_SUCCESS',
                  ].includes(submitStep as string)}
                />
              </ul>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

const StepItem: FC<{
  label: string;
  isCurrent: boolean;
  isWaiting: boolean;
}> = ({ label, isCurrent, isWaiting }) => (
  <li className="flex items-center gap-2">
    <span className="flex size-6 items-center justify-center">
      {isWaiting ? (
        <span>⏳</span>
      ) : isCurrent ? (
        <Loader className="h-4 w-4" />
      ) : (
        <Check className="h-4 w-4 text-success" />
      )}
    </span>
    <span className={isWaiting ? 'animate-pulse' : ''}>{label}</span>
  </li>
);
