'use client';

import {
  Button,
  Form,
  Input,
  Modal,
  Tag,
  useForm,
} from '@intlayer/design-system';
import {
  useDisableTwoFactor,
  useEnableTwoFactor,
  useSession,
  useVerifyTotp,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import {
  type TwoFactorAuthForm,
  useTwoFactorAuthSchema,
} from './useTwoFactorAuthSchema';

type ModalType = 'enable' | 'disable' | 'qrcode' | 'backupCodes' | null;

type TwoFactorData = {
  totpURI: string;
  backupCodes: string[];
};

export const TwoFactorAuth: FC = () => {
  const { state, enableButton, disableButton, modal, qrCode, backupCodes } =
    useIntlayer('two-factor-auth');
  const { session, revalidateSession } = useSession();
  const { user } = session ?? {};
  const { mutate: enableTwoFactor, isPending: isEnablingTwoFactor } =
    useEnableTwoFactor();
  const { mutate: disableTwoFactor, isPending: isDisablingTwoFactor } =
    useDisableTwoFactor();
  const { mutate: verifyTotp, isPending: isVerifyingTotp } = useVerifyTotp();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [twoFactorData, setTwoFactorData] = useState<TwoFactorData | null>(
    null
  );

  const TwoFactorAuthSchema = useTwoFactorAuthSchema();
  const { form, isSubmitting } = useForm(TwoFactorAuthSchema, {
    defaultValues: {
      password: '',
    },
  });

  // @ts-ignore - twoFactorEnabled is added by better-auth plugin but not in types
  const isEnabled = Boolean(user?.twoFactorEnabled);
  const isModalOpen = modalType !== null;
  const isPending = isEnablingTwoFactor || isDisablingTwoFactor;

  const handleOpenModal = (type: 'enable' | 'disable') => {
    setModalType(type);
    form.reset();
  };

  const handleCloseModal = () => {
    setModalType(null);
    form.reset();
  };

  const handleSubmit = async (data: TwoFactorAuthForm) => {
    if (modalType === 'enable') {
      return new Promise<void>((resolve, reject) => {
        enableTwoFactor(
          { password: data.password },
          {
            onSuccess: (result) => {
              // Show QR code modal with the data
              if (result.data) {
                setTwoFactorData({
                  totpURI: result.data.totpURI,
                  backupCodes: result.data.backupCodes,
                });
                setModalType('qrcode');
                form.reset();
                resolve();
              } else {
                reject();
              }
            },
            onError: () => {
              reject();
            },
          }
        );
      });
    } else if (modalType === 'disable') {
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
    }
  };

  const handleVerifyCode = (code: string) => {
    verifyTotp(
      { code },
      {
        onSuccess: () => {
          setModalType('backupCodes');
          revalidateSession();
        },
      }
    );
  };

  const handleBackupCodesDone = () => {
    setTwoFactorData(null);
    handleCloseModal();
  };

  const modalContent =
    modalType && (modalType === 'enable' || modalType === 'disable')
      ? modal[modalType]
      : null;

  const renderModalContent = () => {
    if (modalType === 'qrcode' && twoFactorData) {
      return (
        <QRCodeVerification
          data={twoFactorData}
          onVerify={handleVerifyCode}
          isVerifying={isVerifyingTotp}
        />
      );
    }

    if (modalType === 'backupCodes' && twoFactorData) {
      return (
        <BackupCodesDisplay
          backupCodes={twoFactorData.backupCodes}
          onDone={handleBackupCodesDone}
        />
      );
    }

    if (modalContent) {
      return (
        <div className="mt-6 flex w-full flex-col gap-6">
          <p className="text-neutral text-sm">{modalContent.description}</p>

          <Form
            schema={TwoFactorAuthSchema}
            onSubmitSuccess={handleSubmit}
            className="mt-4 flex flex-col gap-4"
            {...form}
          >
            <Form.InputPassword
              name="password"
              id="two-factor-auth-password"
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
                disabled={isPending || isSubmitting}
                label={modal.cancelButton.value}
                className="flex-1"
              >
                {modal.cancelButton}
              </Button>
              <Form.Button
                type="submit"
                color="text"
                isLoading={isPending || isSubmitting}
                disabled={isPending || isSubmitting}
                label={modal.confirmButton.value}
                className="flex-1"
              >
                {modal.confirmButton}
              </Form.Button>
            </div>
          </Form>
        </div>
      );
    }

    return null;
  };

  const getModalTitle = () => {
    if (modalType === 'qrcode') return qrCode.title.value;
    if (modalType === 'backupCodes') return backupCodes.title.value;
    return modalContent?.title.value;
  };

  return (
    <div className="flex flex-col gap-10">
      <Tag className="ml-auto" size="sm" color={isEnabled ? 'success' : 'text'}>
        {state(isEnabled)}
      </Tag>

      {isEnabled ? (
        <Button
          onClick={() => handleOpenModal('disable')}
          color="text"
          label={disableButton.ariaLabel.value}
        >
          {disableButton.text}
        </Button>
      ) : (
        <Button
          onClick={() => handleOpenModal('enable')}
          color="text"
          label={enableButton.ariaLabel.value}
        >
          {enableButton.text}
        </Button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={getModalTitle()}
        hasCloseButton={modalType !== 'backupCodes'}
        padding="lg"
        className="max-h-[80vh]"
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

// QR Code Verification Component
const QRCodeVerification: FC<{
  data: TwoFactorData;
  onVerify: (code: string) => void;
  isVerifying: boolean;
}> = ({ data, onVerify, isVerifying }) => {
  const { qrCode } = useIntlayer('two-factor-auth');
  const [code, setCode] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      onVerify(code);
    }
  };

  return (
    <div className="mt-6 flex w-full flex-col gap-6">
      <p className="text-neutral text-sm">{qrCode.description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="mx-auto w-fit max-w-sm items-center justify-center rounded-lg bg-white p-4">
          <QRCode size={256} value={data.totpURI} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="verification-code" className="font-medium text-sm">
            {qrCode.codeLabel}
          </label>
          <Input
            id="verification-code"
            type="text"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
            }
            placeholder={qrCode.codePlaceholder.value}
            maxLength={6}
          />
        </div>

        <Button
          type="submit"
          color="text"
          isLoading={isVerifying}
          disabled={isVerifying || code.length !== 6}
          label={qrCode.submitButton.value}
          className="w-full"
        >
          {qrCode.submitButton}
        </Button>
      </form>
    </div>
  );
};

// Backup Codes Display Component
const BackupCodesDisplay: FC<{
  backupCodes: string[];
  onDone: () => void;
}> = ({ backupCodes: codes, onDone }) => {
  const { backupCodes } = useIntlayer('two-factor-auth');

  return (
    <div className="mt-6 flex w-full flex-col gap-6">
      <p className="text-neutral text-sm">{backupCodes.description}</p>

      <div className="m-auto grid max-w-sm grid-cols-2 gap-3 rounded-lg p-4">
        {codes.map((code) => (
          <div
            key={code}
            className="rounded-md bg-neutral/20 px-3 py-2 font-mono text-sm"
          >
            {code}
          </div>
        ))}
      </div>

      <Button
        onClick={onDone}
        color="text"
        label={backupCodes.doneButton.value}
        className="w-full"
      >
        {backupCodes.doneButton}
      </Button>
    </div>
  );
};
