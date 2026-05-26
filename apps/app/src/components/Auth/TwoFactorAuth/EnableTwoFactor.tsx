import {
  useEnableTwoFactor,
  useSession,
  useVerifyTotp,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Form, useForm } from '@intlayer/design-system/form';
import { Modal } from '@intlayer/design-system/modal';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { QRCode } from 'react-qr-code';
import {
  type TwoFactorAuthForm,
  type TwoFactorAuthOTPSchema,
  useTwoFactorAuthOTPSchema,
  useTwoFactorAuthSchema,
} from './useTwoFactorAuthSchema';

type TwoFactorData = {
  totpURI: string;
  backupCodes: string[];
};

type ModalType = 'enable' | 'qrcode' | 'backupCodes' | null;

export const EnableTwoFactor: FC = () => {
  const { enableButton, modal, qrCode, backupCodes } =
    useIntlayer('two-factor-auth');
  const { revalidateSession } = useSession();
  const { mutate: enableTwoFactor, isPending: isEnablingTwoFactor } =
    useEnableTwoFactor();
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

  const isModalOpen = modalType !== null;

  const handleOpenModal = () => {
    setModalType('enable');
    form.reset();
  };

  const handleCloseModal = () => {
    setModalType(null);
    form.reset();
  };

  const handleSubmit = async (data: TwoFactorAuthForm) => {
    return new Promise<void>((resolve, reject) => {
      enableTwoFactor(
        { password: data.password },
        {
          onSuccess: (result) => {
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
  };

  const handleVerifyCode = (code: string) => {
    verifyTotp(
      { code },
      {
        onSuccess: () => {
          setModalType('backupCodes');
        },
      }
    );
  };

  const handleBackupCodesDone = () => {
    setTwoFactorData(null);
    revalidateSession();
    handleCloseModal();
  };

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

    if (modalType === 'enable') {
      return (
        <div className="mt-6 flex w-full flex-col gap-6">
          <p className="text-neutral text-sm">{modal.enable.description}</p>

          <Form
            schema={TwoFactorAuthSchema}
            onSubmitSuccess={handleSubmit}
            className="mt-4 flex flex-col gap-4"
            {...form}
          >
            <Form.InputPassword
              name="password"
              id="enable-two-factor-password"
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
                disabled={isEnablingTwoFactor || isSubmitting}
                label={modal.cancelButton.value}
                className="flex-1"
              >
                {modal.cancelButton}
              </Button>
              <Form.Button
                type="submit"
                color="text"
                isLoading={isEnablingTwoFactor || isSubmitting}
                disabled={isEnablingTwoFactor || isSubmitting}
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
    if (modalType === 'enable') return modal.enable.title.value;
    return '';
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        color="text"
        label={enableButton.ariaLabel.value}
      >
        {enableButton.text}
      </Button>

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
    </>
  );
};

// QR Code Verification Component
const QRCodeVerification: FC<{
  data: TwoFactorData;
  onVerify: (code: string) => void;
  isVerifying: boolean;
}> = ({ data, onVerify, isVerifying }) => {
  const { qrCode } = useIntlayer('two-factor-auth');
  const TwoFactorAuthOTPSchema = useTwoFactorAuthOTPSchema();
  const { form } = useForm(TwoFactorAuthOTPSchema);

  const handleSubmit = (data: TwoFactorAuthOTPSchema) => {
    onVerify(data.code);
  };

  return (
    <div className="mt-6 flex w-full flex-col gap-6">
      <p className="m-auto max-w-sm text-neutral text-sm">
        {qrCode.description}
      </p>

      <Form
        {...form}
        schema={TwoFactorAuthOTPSchema}
        onSubmitSuccess={handleSubmit}
        autoComplete
        className="flex flex-col gap-4"
      >
        <div className="mx-auto w-fit items-center justify-center rounded-lg bg-white p-4">
          <QRCode size={256} value={data.totpURI} />
        </div>

        <div className="m-auto my-6 flex max-w-sm flex-col gap-2">
          <label htmlFor="verification-code" className="font-medium text-sm">
            {qrCode.codeLabel}
          </label>
          <Form.OTP
            id="verification-code"
            name="code"
            type="text"
            placeholder={qrCode.codePlaceholder.value}
            maxLength={6}
          />
        </div>

        <Button
          type="submit"
          color="text"
          isLoading={isVerifying}
          label={qrCode.submitButton.value}
          className="w-full"
        >
          {qrCode.submitButton}
        </Button>
      </Form>
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
