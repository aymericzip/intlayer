'use client';

import { Form, useForm } from '@intlayer/design-system/form';
import { useSendAffiliateInvitation } from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  type SendInvitationFormData,
  useSendInvitationFormSchema,
} from './useSendInvitationFormSchema';

type SendInvitationFormProps = {
  onSuccess?: () => void;
};

export const SendInvitationForm: FC<SendInvitationFormProps> = ({
  onSuccess,
}) => {
  const content = useIntlayer('send-invitation-form');
  const schema = useSendInvitationFormSchema();
  const { form, isSubmitting } = useForm(schema, {
    defaultValues: { commissionRate: 10 },
  });
  const { mutateAsync: sendInvitation, isPending } =
    useSendAffiliateInvitation();

  const handleSubmit = async (data: SendInvitationFormData) => {
    await sendInvitation({
      email: data.email,
      commissionRate: data.commissionRate,
      commissionType: 'recurring',
    });
    form.reset();
    onSuccess?.();
  };

  return (
    <Form
      schema={schema}
      onSubmitSuccess={handleSubmit}
      className="flex flex-col gap-6"
      {...form}
    >
      <Form.Input
        name="email"
        type="email"
        label={content.emailAddress.value}
        placeholder={content.partnerEmailPlaceholder.value}
        isRequired
      />

      <Form.Input
        name="commissionRate"
        type="number"
        label={content.commissionRate.value}
        isRequired
      />

      <Form.Button
        type="submit"
        color="text"
        isLoading={isSubmitting || isPending}
        disabled={isSubmitting || isPending}
        label={content.sendInvitationLabel.value}
        className="mt-2 w-full"
      >
        {isPending ? content.sending : content.sendInvitation}
      </Form.Button>
    </Form>
  );
};
