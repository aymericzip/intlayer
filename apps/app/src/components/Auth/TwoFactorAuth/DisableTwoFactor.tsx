import { Button } from '@intlayer/design-system/button';
import { Form, useForm } from '@intlayer/design-system/form';
import { useDisableTwoFactor, useSession } from '@intlayer/design-system/hooks';
import { Modal } from '@intlayer/design-system/modal';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  type TwoFactorAuthForm,
  useTwoFactorAuthSchema,
} from './useTwoFactorAuthSchema';

export const DisableTwoFactor: FC = () => {
  const { disableButton, modal } = useIntlayer('two-factor-auth');
  const { revalidateSession } = useSession();
  const { mutate: disableTwoFactor, isPending: isDisablingTwoFactor } =
    useDisableTwoFactor();
  const [isOpen, setIsOpen] = useState(false);

  const TwoFactorAuthSchema = useTwoFactorAuthSchema();
  const { form, isSubmitting } = useForm(TwoFactorAuthSchema, {
    defaultValues: {
      password: '',
    },
  });

  const handleOpenModal = () => {
    setIsOpen(true);
    form.reset();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset();
  };

  const handleSubmit = async (data: TwoFactorAuthForm) => {
    return new Promise<void>((resolve, reject) => {
      disableTwoFactor(
        { password: data.password },
        {
          onSuccess: () => {
            handleCloseModal();
            revalidateSession();
            resolve();
          },
          onError: () => {
            reject();
          },
        }
      );
    });
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        color="text"
        label={disableButton.ariaLabel.value}
      >
        {disableButton.text}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={modal.disable.title.value}
        padding="lg"
        className="max-h-[80vh]"
      >
        <div className="mt-6 flex w-full flex-col gap-6">
          <p className="text-neutral text-sm">{modal.disable.description}</p>

          <Form
            schema={TwoFactorAuthSchema}
            onSubmitSuccess={handleSubmit}
            className="mt-4 flex flex-col gap-4"
            {...form}
          >
            <Form.InputPassword
              name="password"
              id="disable-two-factor-password"
              autoComplete="current-password"
              placeholder={modal.passwordPlaceholder.value}
              isRequired
              autoFocus
            />

            <div className="flex gap-3">
              <Button
                onClick={handleCloseModal}
                color="text"
                variant="outline"
                disabled={isDisablingTwoFactor || isSubmitting}
                label={modal.cancelButton.value}
                className="flex-1"
              >
                {modal.cancelButton}
              </Button>
              <Form.Button
                type="submit"
                color="text"
                isLoading={isDisablingTwoFactor || isSubmitting}
                disabled={isDisablingTwoFactor || isSubmitting}
                label={modal.confirmButton.value}
                className="flex-1"
              >
                {modal.confirmButton}
              </Form.Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};
