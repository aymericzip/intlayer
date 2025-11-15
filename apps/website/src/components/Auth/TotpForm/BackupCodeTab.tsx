'use client';

import { Form, useForm } from '@intlayer/design-system';
import { useVerifyBackupCode } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import z from 'zod';

const backupCodeSchema = z.object({
  code: z.string().min(1),
});

type BackupCodeFormData = z.infer<typeof backupCodeSchema>;

export const BackupCodeTab: FC = () => {
  const router = useRouter();
  const { codeLabel, codePlaceholder, verifyButton } =
    useIntlayer('backup-code-tab');

  const { form, isSubmitting } = useForm(backupCodeSchema, {
    defaultValues: {
      code: '',
    },
  });

  const { mutate: verifyBackupCode } = useVerifyBackupCode();

  const handleBackupCodeVerification = async (data: BackupCodeFormData) => {
    verifyBackupCode(data, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <Form
      {...form}
      schema={backupCodeSchema}
      onSubmitSuccess={handleBackupCodeVerification}
      className="space-y-4"
    >
      <Form.Input
        name="code"
        label={codeLabel.value}
        placeholder={codePlaceholder.value}
      />

      <Form.Button
        type="submit"
        label={verifyButton.value}
        isLoading={isSubmitting}
        className="w-full"
      >
        {verifyButton}
      </Form.Button>
    </Form>
  );
};
