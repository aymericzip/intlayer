import { Button } from '@intlayer/design-system/button';
import { useChangePassword, useUser } from '@intlayer/design-system/hooks';
import { Modal } from '@intlayer/design-system/modal';
import { App_Home_Path } from '@intlayer/design-system/routes';
import { Check } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { ChangePasswordForm as ChangePasswordFormUI } from './ChangePasswordForm';
import type { ChangePassword } from './ChangePasswordForm/useChangePasswordSchema';

type ChangePasswordFormProps = {
  callbackUrl?: string;
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  callbackUrl = App_Home_Path,
}) => {
  const navigate = useLocalizedNavigate();
  const { user } = useUser();
  const { mutate: changePassword, isSuccess } = useChangePassword();
  const { goToLoginButton } = useIntlayer('change-password-form');

  if (!user) return null;

  if (isSuccess) {
    return (
      <>
        <div className="m-auto aspect-square rounded-full bg-success/30 p-5">
          <Check className="text-success" size={50} />
        </div>
        <Button
          label={goToLoginButton.text.value}
          color="text"
          Icon={Check}
          onClick={() => navigate({ to: callbackUrl as any })}
          isFullWidth
        >
          {goToLoginButton.text}
        </Button>
      </>
    );
  }

  return <ChangePasswordFormUI onSubmitSuccess={changePassword} />;
};

type ChangePasswordModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  isOpen: isOpenProp,
  onClose: onCloseProp,
}) => {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : isOpenInternal;

  const { user } = useUser();
  const { mutate: changePassword } = useChangePassword();
  const { openButton } = useIntlayer('change-password-form');

  if (!user) return null;

  const handleOpenModal = () => {
    if (!isControlled) setIsOpenInternal(true);
  };

  const handleCloseModal = () => {
    if (!isControlled) setIsOpenInternal(false);
    onCloseProp?.();
  };

  const handleSubmit = (data: ChangePassword) =>
    new Promise<void>((resolve, reject) => {
      changePassword(data, {
        onSuccess: () => {
          handleCloseModal();
          resolve();
        },
        onError: () => reject(),
      });
    });

  return (
    <>
      {!isControlled && (
        <Button
          onClick={handleOpenModal}
          color="text"
          label={openButton.ariaLabel.value}
        >
          {openButton.text}
        </Button>
      )}

      <Modal
        isOpen={isOpen ?? false}
        onClose={handleCloseModal}
        title={openButton.text.value}
        padding="lg"
        className="max-h-[80vh]"
      >
        {isOpen && <ChangePasswordFormUI onSubmitSuccess={handleSubmit} />}
      </Modal>
    </>
  );
};
