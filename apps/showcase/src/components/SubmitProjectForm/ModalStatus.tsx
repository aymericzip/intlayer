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
}

export const ModalStatus: FC<ModalStatusProps> = ({
  submitStep,
  submitError,
  onClose,
  onRetry,
  onSuccess,
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
          </>
        )}
      </div>
    </Modal>
  );
};

