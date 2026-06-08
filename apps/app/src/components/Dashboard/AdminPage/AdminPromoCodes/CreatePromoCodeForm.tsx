import { useCreatePromoCode } from '@intlayer/design-system/api';
import { Form, useForm } from '@intlayer/design-system/form';
import { Select } from '@intlayer/design-system/select';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  type CreatePromoCodeFormData,
  useCreatePromoCodeFormSchema,
} from './useCreatePromoCodeFormSchema';

type ExpirationPreset = 'none' | '1m' | '2m' | '3m' | '6m' | '1y' | 'custom';

const computeExpiresAt = (preset: ExpirationPreset): string | undefined => {
  if (preset === 'none' || preset === 'custom') return undefined;
  const now = new Date();
  switch (preset) {
    case '1m':
      return new Date(now.setMonth(now.getMonth() + 1))
        .toISOString()
        .slice(0, 10);
    case '2m':
      return new Date(now.setMonth(now.getMonth() + 2))
        .toISOString()
        .slice(0, 10);
    case '3m':
      return new Date(now.setMonth(now.getMonth() + 3))
        .toISOString()
        .slice(0, 10);
    case '6m':
      return new Date(now.setMonth(now.getMonth() + 6))
        .toISOString()
        .slice(0, 10);
    case '1y':
      return new Date(now.setFullYear(now.getFullYear() + 1))
        .toISOString()
        .slice(0, 10);
  }
};

type CreatePromoCodeFormProps = {
  onSuccess?: () => void;
  affiliateId?: string;
};

export const CreatePromoCodeForm: FC<CreatePromoCodeFormProps> = ({
  onSuccess,
  affiliateId,
}) => {
  const content = useIntlayer('admin-promo-codes');
  const schema = useCreatePromoCodeFormSchema();
  const [expirationPreset, setExpirationPreset] =
    useState<ExpirationPreset>('none');

  const { form, isSubmitting } = useForm(schema, {
    defaultValues: { discountType: 'percentage', discountValue: 10 },
  });

  const { mutateAsync: createPromoCode, isPending } = useCreatePromoCode();

  const handlePresetChange = (value: string) => {
    const preset = value as ExpirationPreset;
    setExpirationPreset(preset);
    form.setValue(
      'expiresAt',
      preset !== 'custom' ? computeExpiresAt(preset) : undefined
    );
  };

  const PRESETS: { value: ExpirationPreset; label: string }[] = [
    { value: 'none', label: content.expirationPresets.none.value },
    { value: '1m', label: content.expirationPresets.oneMonth.value },
    { value: '2m', label: content.expirationPresets.twoMonths.value },
    { value: '3m', label: content.expirationPresets.threeMonths.value },
    { value: '6m', label: content.expirationPresets.sixMonths.value },
    { value: '1y', label: content.expirationPresets.oneYear.value },
    { value: 'custom', label: content.expirationPresets.custom.value },
  ];

  const handleSubmit = async (data: CreatePromoCodeFormData) => {
    await createPromoCode({
      code: data.code.toUpperCase(),
      discountType: data.discountType as 'amount' | 'percentage',
      discountValue: data.discountValue,
      affiliateId,
      expiresAt: data.expiresAt || undefined,
    });
    form.reset();
    setExpirationPreset('none');
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
        name="code"
        label={content.codeLabel.value}
        placeholder={content.codePlaceholder.value}
        isRequired
      />

      <Form.Select
        name="discountType"
        label={content.discountTypeLabel.value}
        isRequired
      >
        <Select.Trigger>
          <Select.Value placeholder={content.discountTypePlaceholder.value} />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="percentage">
            {content.percentage.value}
          </Select.Item>
          <Select.Item value="amount">{content.amount.value}</Select.Item>
        </Select.Content>
      </Form.Select>

      <Form.Input
        name="discountValue"
        type="number"
        label={content.discountValueLabel.value}
        isRequired
      />

      <div className="flex w-full flex-col gap-1 px-1">
        <span className="mb-1 ml-1 select-none font-bold text-sm leading-none">
          {content.expiresAtLabel.value}
        </span>
        <Select value={expirationPreset} onValueChange={handlePresetChange}>
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            {PRESETS.map(({ value, label }) => (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>

      {expirationPreset === 'custom' && (
        <Form.Input
          name="expiresAt"
          type="date"
          min={new Date().toISOString().slice(0, 10)}
        />
      )}

      <Form.Button
        type="submit"
        color="text"
        isLoading={isSubmitting || isPending}
        disabled={isSubmitting || isPending}
        label={content.submitButton.value}
        className="mt-2 w-full"
      >
        {isPending ? content.creating.value : content.submitButton.value}
      </Form.Button>
    </Form>
  );
};
export default CreatePromoCodeForm;
