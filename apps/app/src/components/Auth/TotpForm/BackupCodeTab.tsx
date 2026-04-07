'use client';

import { Form, useForm } from '@intlayer/design-system/form';
import { useVerifyBackupCode } from '@intlayer/design-system/hooks';
import { useNavigate, useSearch } from '@tanstack/react-router';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import z from 'zod';

const backupCodeSchema = z.object({
  code: z.string().min(1),
});

type BackupCodeFormData = z.infer<typeof backupCodeSchema>;

export const BackupCodeTab: FC = () => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as any;
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
        // Redirect to the original destination or home
        const redirectUrl = search.redirect_url;
        navigate({ to: (redirectUrl ?? '/') as any });
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
