import type { GetMarketplaceQuery } from '@intlayer/backend';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Input } from '@intlayer/design-system/input';
import { Select } from '@intlayer/design-system/select';
import { X } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { LocalePicker } from '#components/LocalePicker';

export type TranslatorFiltersValue = GetMarketplaceQuery;

type TranslatorFiltersProps = {
  value: TranslatorFiltersValue;
  onChange: (filters: TranslatorFiltersValue) => void;
};

const Field: FC<{
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}> = ({ label, htmlFor, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={htmlFor} className="font-medium text-sm">
      {label}
    </label>
    {children}
  </div>
);

export const TranslatorFilters: FC<TranslatorFiltersProps> = ({
  value,
  onChange,
}) => {
  const content = useIntlayer('translator-filters');

  const update = (patch: Partial<TranslatorFiltersValue>) =>
    onChange({ ...value, ...patch });

  return (
    <Container
      roundedSize="3xl"
      padding="xl"
      border
      borderColor="neutral"
      className="w-full"
    >
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold">{content.filters}</h2>

        <Field label={content.sourceLanguage.value}>
          <LocalePicker
            identifier="filter-from"
            value={value.fromLocale ?? ''}
            onChange={(locale) => update({ fromLocale: locale || undefined })}
            placeholder={content.egEn.value}
          />
        </Field>

        <Field label={content.targetLanguage.value}>
          <LocalePicker
            identifier="filter-to"
            value={value.toLocale ?? ''}
            onChange={(locale) => update({ toLocale: locale || undefined })}
            placeholder={content.egFr.value}
          />
        </Field>

        <Field label={content.minRating.value} htmlFor="minRating">
          <Select
            value={value.minRating?.toString() ?? 'any'}
            onValueChange={(val) =>
              update({ minRating: val === 'any' ? undefined : Number(val) })
            }
          >
            <Select.Trigger id="minRating">
              <Select.Value placeholder={content.any.value} />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="any">{content.any}</Select.Item>
              <Select.Item value="4">{content.fourPlusStars}</Select.Item>
              <Select.Item value="4.5">
                {content.fourPointFivePlusStars}
              </Select.Item>
            </Select.Content>
          </Select>
        </Field>

        <Field label={content.maxPriceHr.value} htmlFor="maxPricePerHour">
          <Input
            id="maxPricePerHour"
            type="number"
            min={0}
            placeholder={content.eg100.value}
            value={
              value.maxPricePerHour !== undefined
                ? value.maxPricePerHour / 100
                : ''
            }
            onChange={(e) =>
              update({
                maxPricePerHour: e.target.value
                  ? Number(e.target.value) * 100
                  : undefined,
              })
            }
          />
        </Field>

        <Button
          type="button"
          variant="hoverable"
          color="text"
          size="sm"
          Icon={X}
          onClick={() => onChange({})}
          label={content.clearFilters.value}
          className="self-start"
        >
          {content.clearFilters}
        </Button>
      </div>
    </Container>
  );
};
