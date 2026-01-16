import { Form, Modal } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

type DeleteDictionaryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  count?: number;
};

export const DeleteDictionaryModal: FC<DeleteDictionaryModalProps> = ({
  onClose,
  onConfirm,
  isOpen,
  isDeleting,
  count = 1,
}) => {
  const { confirmButton, cancelButton, description, title } = useIntlayer(
    'delete-dictionary-modal'
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title.value}
      size="md"
      padding="md"
    >
      <form className="size-full px-3">
        <p className="py-4 text-neutral text-sm">
          {count > 1 ? description.bulk : description.single}
        </p>
        <div className="mt-12 flex justify-end gap-2 max-md:flex-col">
          <Form.Button
            variant="outline"
            label={cancelButton.label.value}
            color="text"
            type="button"
            isFullWidth={true}
            className="w-auto"
            onClick={onClose}
          >
            {cancelButton.text}
          </Form.Button>
          <Form.Button
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
          </Form.Button>
        </div>
      </form>
    </Modal>
  );
};
