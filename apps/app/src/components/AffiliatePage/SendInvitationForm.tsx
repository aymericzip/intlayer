'use client';

import { Form, useForm } from '@intlayer/design-system/form';
import { useSendAffiliateInvitation } from '@intlayer/design-system/hooks';
import { Select } from '@intlayer/design-system/select';
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
      ...(data.category ? { category: data.category } : {}),
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

      <Form.Select
        name="category"
        label={content.categoryLabel.value}
        description={content.selectCategory.value}
      >
        <Select.Trigger>
          <Select.Value placeholder={content.selectCategory.value} />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="native_speaker">
            {content.categoryLabels.native_speaker}
          </Select.Item>
          <Select.Item value="marketing_expert">
            {content.categoryLabels.marketing_expert}
          </Select.Item>
          <Select.Item value="copywriter">
            {content.categoryLabels.copywriter}
          </Select.Item>
          <Select.Item value="certified_translator">
            {content.categoryLabels.certified_translator}
          </Select.Item>
        </Select.Content>
      </Form.Select>

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
