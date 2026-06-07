import {
  Form,
  FormButton,
  FormInput,
  useForm,
} from '@intlayer/design-system/form';
import { Modal } from '@intlayer/design-system/modal';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useAddPasskeySchema } from './useAddPasskeySchema';

type AddPasskeyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
  isSubmitting: boolean;
};

export const AddPasskeyModal: FC<AddPasskeyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const AddPasskeySchema = useAddPasskeySchema();
  const { form } = useForm(AddPasskeySchema, {
    defaultValues: {
      name: '',
    },
  });

  const {
    modalTitle,
    modalDescription,
    nameInput,
    submitButton,
    cancelButton,
  } = useIntlayer('add-passkey-modal');

  const handleSubmit = (data: { name: string }) => {
    onSubmit(data);
    form.reset();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} padding="md">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-semibold text-xl">{modalTitle}</h2>
          <p className="text-neutral-600 text-sm dark:text-neutral-400">
            {modalDescription}
          </p>
        </div>
        <Form
          schema={AddPasskeySchema}
          onSubmitSuccess={handleSubmit}
          className="space-y-4"
          {...form}
        >
          <FormInput
            name="name"
            id="add-passkey-name-input"
            label={nameInput.label.value}
            placeholder={nameInput.placeholder.value}
            isRequired
          />

          <div className="flex justify-end gap-2">
            <FormButton
              variant="outline"
              onClick={handleClose}
              label={cancelButton.ariaLabel.value}
              disabled={isSubmitting}
            >
              {cancelButton.text}
            </FormButton>
            <FormButton
              type="submit"
              color="text"
              isLoading={isSubmitting}
              label={submitButton.ariaLabel.value}
            >
              {submitButton.text}
            </FormButton>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
