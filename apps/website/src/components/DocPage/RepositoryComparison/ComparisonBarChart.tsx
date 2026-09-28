import { Container } from '@intlayer/design-system/container';
import { cn } from '@intlayer/design-system/utils';
import type { FC, ReactNode } from 'react';
import { useLocale } from 'react-intlayer';
import {
  getLibColor,
  isIntlayerLib,
} from '~/components/I18nBenchmark/constants';

export type ComparisonBarItem = {
  /** Displayed name, e.g. `amannn/next-intl` or `next-intl`. */
  label: string;
  /** Library id used for the bar color, e.g. `next-intl`. */
  libraryId: string;
  /** `null` when the source could not answer. */
  value: number | null;
};

type ComparisonBarChartProps = {
  items: ComparisonBarItem[];
  isPending: boolean;
  /** Unit appended to each value, e.g. `commits`. */
  unit: ReactNode;
  unavailableLabel: ReactNode;
  /** Controls rendered above the bars, e.g. a period selector. */
  header?: ReactNode;
  footer: ReactNode;
};

/** Horizontal bars sorted by value, Intlayer entries highlighted. */
export const ComparisonBarChart: FC<ComparisonBarChartProps> = ({
  items,
  isPending,
  unit,
  unavailableLabel,
  header,
  footer,
}) => {
  const { locale } = useLocale();
  const numberFormat = new Intl.NumberFormat(locale);

  const sortedItems = [...items].sort(
    (itemA, itemB) => (itemB.value ?? -1) - (itemA.value ?? -1)
  );
  const maximumValue = Math.max(1, ...items.map((item) => item.value ?? 0));

  return (
    <Container
      roundedSize="2xl"
      border
      borderColor="neutral"
      transparency="md"
      padding="lg"
      className="not-prose flex flex-col gap-4"
      aria-busy={isPending}
    >
      {header}
      <ul className="flex flex-col gap-3">
        {sortedItems.map((item) => {
          const isIntlayer = isIntlayerLib(item.libraryId);
          const widthPercentage =
            item.value === null ? 0 : (item.value / maximumValue) * 100;

          return (
            <li key={item.label} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span
                  className={cn(
                    'truncate',
                    isIntlayer ? 'font-bold text-text' : 'text-text/80'
                  )}
                >
                  {item.label}
                </span>
                <span className="shrink-0 text-text/70 tabular-nums">
                  {isPending ? (
                    <span className="inline-block h-3 w-16 animate-pulse rounded-md bg-neutral/20" />
                  ) : item.value === null ? (
                    unavailableLabel
                  ) : (
                    <>
                      {numberFormat.format(item.value)} {unit}
                    </>
                  )}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-neutral/10">
                <div
                  className={cn(
                    'h-full rounded-full transition-[width] duration-700',
                    isPending && 'animate-pulse',
                    isIntlayer && 'bg-neutral-900 dark:bg-neutral-100'
                  )}
                  style={{
                    width: `${isPending ? 0 : widthPercentage}%`,
                    backgroundColor: isIntlayer
                      ? undefined
                      : getLibColor(item.libraryId, false),
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="text-text/50 text-xs">{footer}</p>
    </Container>
  );
};
