import { Form, FormButton } from '@intlayer/design-system/form';
import { Modal } from '@intlayer/design-system/modal';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type DeleteTagsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  count?: number;
};

export const DeleteTagsModal: FC<DeleteTagsModalProps> = ({
  onClose,
  onConfirm,
  isOpen,
  isDeleting,
  count = 1,
}) => {
  const { confirmButton, cancelButton, description, title } =
    useIntlayer('delete-tag-modal');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title.value}
      size="md"
      padding="md"
      hasCloseButton
    >
      <form className="size-full px-3">
        <p className="py-4 text-neutral text-sm">
          {count > 1 ? description.bulk : description.single}
        </p>
        <div className="mt-12 flex justify-end gap-2 max-md:flex-col">
          <FormButton
            variant="outline"
            label={cancelButton.label.value}
            color="text"
            type="button"
            isFullWidth={true}
            className="w-auto"
            onClick={onClose}
          >
            {cancelButton.text}
          </FormButton>
          <FormButton
            variant="outline"
            label={confirmButton.label.value}
            isFullWidth={true}
            color="error"
            className="w-auto"
            isLoading={isDeleting}
            disabled={isDeleting}
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            {confirmButton.text}
          </FormButton>
        </div>
      </form>
    </Modal>
  );
};
