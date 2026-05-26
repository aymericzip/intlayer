import type { GetMarketplaceQuery } from '@intlayer/backend';
import { useGetReviewerPriceDistribution } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Checkbox } from '@intlayer/design-system/input';
import { Select } from '@intlayer/design-system/select';
import { X } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { LocalePicker } from '#components/LocalePicker';
import { PriceRangeSlider } from './PriceRangeSlider';

export type ReviewerFiltersValue = GetMarketplaceQuery;

const CATEGORIES = [
  'copywriter',
  'translator',
  'proofreader',
  'technical_writer',
  'marketing',
] as const;

type Category = (typeof CATEGORIES)[number];

type ReviewerFiltersProps = {
  value: ReviewerFiltersValue;
  onChange: (filters: ReviewerFiltersValue) => void;
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

export const ReviewerFilters: FC<ReviewerFiltersProps> = ({
  value,
  onChange,
}) => {
  const content = useIntlayer('reviewer-filters');

  const { data: priceDistData } = useGetReviewerPriceDistribution({
    fromLocale: value.fromLocale,
    toLocale: value.toLocale,
    minRating: value.minRating,
    categories: value.categories,
  });

  const globalMin = priceDistData?.data?.globalMin ?? 0;
  const globalMax = priceDistData?.data?.globalMax ?? 50000;
  const buckets = priceDistData?.data?.buckets ?? [];

  const update = (patch: Partial<ReviewerFiltersValue>) =>
    onChange({ ...value, ...patch });

  const selectedCategories: string[] = Array.isArray(value.categories)
    ? value.categories
    : value.categories
      ? [value.categories]
      : [];

  const toggleCategory = (cat: Category) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    update({ categories: next.length > 0 ? next : undefined });
  };

  return (
    <Container
      roundedSize="3xl"
      padding="xl"
      border
      borderColor="neutral"
      className="w-full"
    >
      <search
        aria-label={content.filterReviewers.value}
        className="flex flex-col gap-4"
      >
        <h2 className="font-semibold">{content.filters}</h2>

        {/* Category checkboxes */}
        <Field label={content.categories.value}>
          <div className="grid grid-cols-1 gap-2">
            {CATEGORIES.map((cat) => (
              <Checkbox
                key={cat}
                color="text"
                name={`category-${cat}`}
                label={content.categoryLabels[cat]}
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                size="sm"
              />
            ))}
          </div>
        </Field>

        <div className="flex gap-2">
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
        </div>

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

        <Field label={content.priceRange.value}>
          <PriceRangeSlider
            globalMin={globalMin}
            globalMax={globalMax}
            minValue={value.minPricePerHour}
            maxValue={value.maxPricePerHour}
            onMinChange={(v) => update({ minPricePerHour: v })}
            onMaxChange={(v) => update({ maxPricePerHour: v })}
            distribution={buckets}
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
      </search>
    </Container>
  );
};
