import { useVerifyBackupCode } from '@intlayer/design-system/api';
import {
  Form,
  FormButton,
  FormInput,
  useForm,
} from '@intlayer/design-system/form';
import { useSearch } from '@tanstack/react-router';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import z from 'zod';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';

const backupCodeSchema = z.object({
  code: z.string().min(1),
});

type BackupCodeFormData = z.infer<typeof backupCodeSchema>;

export const BackupCodeTab: FC = () => {
  const navigate = useLocalizedNavigate();
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
      <FormInput
        name="code"
        label={codeLabel.value}
        placeholder={codePlaceholder.value}
      />

      <FormButton
        type="submit"
        label={verifyButton.value}
        isLoading={isSubmitting}
        className="w-full"
      >
        {verifyButton}
      </FormButton>
    </Form>
  );
};
