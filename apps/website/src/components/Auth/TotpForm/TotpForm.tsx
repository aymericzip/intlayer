'use client';

import { Form, useForm } from '@intlayer/design-system';
import { useSession, useVerifyTotp } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import z from 'zod';

const totpSchema = z.object({
  code: z.string().length(6),
});

type TotpFormData = z.infer<typeof totpSchema>;

export const TotpForm: FC = () => {
  const { codeLabel, codePlaceholder, verifyButton } = useIntlayer('totp-form');

  const { revalidateSession } = useSession();
  const { mutate: verifyTotp } = useVerifyTotp();

  const { form, isSubmitting } = useForm(totpSchema, {
    defaultValues: {
      code: '',
    },
  });

  const handleTotpVerification = async (data: TotpFormData) => {
    verifyTotp(data, {
      onSuccess: () => {
        revalidateSession();
      },
    });
  };

  return (
    <Form
      {...form}
      schema={totpSchema}
      onSubmitSuccess={handleTotpVerification}
      className="space-y-4"
    >
      <Form.OTP
        name="code"
        maxLength={6}
        label={codeLabel.value}
        placeholder={codePlaceholder.value}
        autoFocus
      />

      <Form.Button
        type="submit"
        color="text"
        label={verifyButton.value}
        isLoading={isSubmitting}
        className="w-full"
      >
        {verifyButton}
      </Form.Button>
    </Form>
  );
};
