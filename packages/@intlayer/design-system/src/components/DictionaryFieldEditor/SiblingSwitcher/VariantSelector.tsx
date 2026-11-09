'use client';

import { Button } from '@components/Button';
import { cn } from '@utils/cn';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  getStructuredVariantFields,
  getVariantDimensions,
  isVariantCombinationDeclared,
  resolveVariantForDimension,
  type VariantDimensionValue,
  type VariantIdentity,
} from './siblingSelection';

export type VariantSelectorProps = {
  variants: VariantIdentity[];
  /** Identity of the selected variant, `null` when none is selected. */
  selectedVariant: string | null;
  /** Called with the identity to select, `null` to clear the selection. */
  onSelectVariant: (variant: string | null) => void;
  /** Marks the chip of a variant holding unsaved edits. */
  getHasUnsavedChanges?: (variant: VariantIdentity) => boolean;
  /** Chip rendered before the named variants (e.g. the base entry). */
  leadingChip?: ReactNode;
};

/** Small amber dot marking a variant with unsaved edits. */
const UnsavedDot: FC = () => (
  <span
    aria-hidden
    className="inline-block size-1.5 shrink-0 rounded-full bg-warning"
  />
);

/** Horizontally scrollable chip row: long variant lists never wrap. */
const ScrollRow: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-x-auto pb-1">
    {children}
  </div>
);

/**
 * Variant picker. Named variants share one chip row; structured variants
 * get one row per field (`id`, `category`…) with a chip per distinct value,
 * so `N` variants over `D` fields render `D` rows instead of `N` JSON chips.
 */
export const VariantSelector: FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
  getHasUnsavedChanges,
  leadingChip,
}) => {
  const content = useIntlayer('sibling-switcher');

  const selectedVariantIdentity = variants.find(
    (variant) => variant.identity === selectedVariant
  );
  const selectedVariantFields = getStructuredVariantFields(
    selectedVariantIdentity
  );
  const namedVariants = variants.filter((variant) => !variant.isStructured);
  const variantDimensions = getVariantDimensions(variants);

  const renderNamedVariantChip = (variant: VariantIdentity) => {
    const isActive = selectedVariant === variant.identity;

    return (
      <Button
        key={variant.identity}
        variant={isActive ? 'default' : 'outline'}
        size="sm"
        color="text"
        label={variant.identity}
        aria-pressed={isActive}
        onClick={() => onSelectVariant(isActive ? null : variant.identity)}
        className="shrink-0"
      >
        <span className="flex items-center gap-1.5">
          {String(variant.primaryValue)}
          {variant.isDefault && (
            <span className="font-normal opacity-70">
              ({content.defaultTag})
            </span>
          )}
          {getHasUnsavedChanges?.(variant) && <UnsavedDot />}
        </span>
      </Button>
    );
  };

  const renderDimensionValueChip = (
    dimensionName: string,
    value: VariantDimensionValue
  ) => {
    const isActive = selectedVariantFields?.[dimensionName] === value;
    const targetVariant = resolveVariantForDimension(
      variants,
      selectedVariantIdentity,
      dimensionName,
      value
    );
    const isDeclared = isVariantCombinationDeclared(
      variants,
      selectedVariantIdentity,
      dimensionName,
      value
    );

    return (
      <Button
        key={String(value)}
        variant={isActive ? 'default' : 'outline'}
        size="sm"
        color="text"
        label={`${dimensionName}: ${value}`}
        aria-pressed={isActive}
        onClick={() =>
          onSelectVariant(isActive ? null : (targetVariant?.identity ?? null))
        }
        className={cn('shrink-0 font-mono', !isDeclared && 'opacity-60')}
      >
        <span className="flex items-center gap-1.5" dir="ltr">
          {String(value)}
          {targetVariant && getHasUnsavedChanges?.(targetVariant) && (
            <UnsavedDot />
          )}
        </span>
      </Button>
    );
  };

  return (
    <div className="flex min-w-0 flex-col gap-2">
      {(namedVariants.length > 0 || leadingChip) && (
        <ScrollRow>
          {leadingChip}
          {namedVariants.map(renderNamedVariantChip)}
        </ScrollRow>
      )}
      {variantDimensions.map((dimension) => (
        <div key={dimension.name} className="flex min-w-0 items-center gap-2">
          <span
            className="w-20 shrink-0 truncate font-mono text-xs text-neutral"
            dir="ltr"
            title={dimension.name}
          >
            {dimension.name}
          </span>
          <ScrollRow>
            {dimension.values.map((value) =>
              renderDimensionValueChip(dimension.name, value)
            )}
          </ScrollRow>
        </div>
      ))}
      {selectedVariantIdentity &&
        selectedVariantIdentity.aliases.length > 0 && (
          <span className="text-xs text-neutral">
            {content.alsoAnswersTo}{' '}
            <span className="font-mono" dir="ltr">
              {selectedVariantIdentity.aliases
                .map((alias) =>
                  typeof alias === 'string' ? alias : JSON.stringify(alias)
                )
                .join(', ')}
            </span>
          </span>
        )}
    </div>
  );
};
