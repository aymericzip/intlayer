import type { PriceDistributionData } from '@intlayer/backend';
import type { FC } from 'react';
import { useCallback, useId } from 'react';

type PriceRangeSliderProps = {
  globalMin: number;
  globalMax: number;
  minValue: number | undefined;
  maxValue: number | undefined;
  onMinChange: (value: number | undefined) => void;
  onMaxChange: (value: number | undefined) => void;
  distribution?: PriceDistributionData['buckets'];
};

const HISTOGRAM_BARS = 20;

const toDisplay = (cents: number) => `$${Math.round(cents / 100)}`;

export const PriceRangeSlider: FC<PriceRangeSliderProps> = ({
  globalMin,
  globalMax,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  distribution = [],
}) => {
  const minLabelId = useId();
  const maxLabelId = useId();

  const range = globalMax - globalMin || 1;
  const currentMin = minValue ?? globalMin;
  const currentMax = maxValue ?? globalMax;

  const minPercent = ((currentMin - globalMin) / range) * 100;
  const maxPercent = ((currentMax - globalMin) / range) * 100;

  const maxHistCount = distribution.reduce(
    (acc, b) => Math.max(acc, b.count),
    1
  );

  const getBarBuckets = (): Array<{
    heightPct: number;
    inRange: boolean;
  }> => {
    if (distribution.length === 0) {
      return Array.from({ length: HISTOGRAM_BARS }, () => ({
        heightPct: 0,
        inRange: false,
      }));
    }

    const step = range / HISTOGRAM_BARS;
    return Array.from({ length: HISTOGRAM_BARS }, (_, i) => {
      const barMin = globalMin + i * step;
      const barMax = globalMin + (i + 1) * step;

      const count = distribution.reduce((sum, b) => {
        const overlap =
          Math.max(0, Math.min(b.max, barMax) - Math.max(b.min, barMin)) /
          (b.max - b.min || 1);
        return sum + b.count * overlap;
      }, 0);

      const inRange = barMax > currentMin && barMin < currentMax;
      return { heightPct: (count / maxHistCount) * 100, inRange };
    });
  };

  const bars = getBarBuckets();

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      const clamped = Math.min(val, currentMax - 1);
      onMinChange(clamped <= globalMin ? undefined : clamped);
    },
    [currentMax, globalMin, onMinChange]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      const clamped = Math.max(val, currentMin + 1);
      onMaxChange(clamped >= globalMax ? undefined : clamped);
    },
    [currentMin, globalMax, onMaxChange]
  );

  return (
    <div className="flex flex-col gap-2">
      {/* Histogram */}
      <div
        aria-hidden="true"
        className="flex h-12 items-end gap-px overflow-hidden"
      >
        {bars.map((bar) => (
          <div
            key={`${bar.heightPct}-${bar.inRange}`}
            className="flex-1 rounded-t-sm transition-colors"
            style={{
              height: `${Math.max(bar.heightPct, 4)}%`,
              background: bar.inRange
                ? 'var(--color-text)'
                : 'color-mix(in srgb, var(--color-neutral) 25%, transparent)',
            }}
          />
        ))}
      </div>

      {/* Dual range track */}
      <div className="relative h-1 rounded-full bg-neutral/20">
        {/* Filled range */}
        <div
          className="absolute h-full rounded-full bg-text"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
          aria-hidden="true"
        />

        {/* Min thumb */}
        <input
          type="range"
          aria-labelledby={minLabelId}
          className="price-range-thumb absolute inset-0 h-full w-full"
          min={globalMin}
          max={globalMax}
          step={100}
          value={currentMin}
          onChange={handleMinChange}
        />

        {/* Max thumb */}
        <input
          type="range"
          aria-labelledby={maxLabelId}
          className="price-range-thumb absolute inset-0 h-full w-full"
          min={globalMin}
          max={globalMax}
          step={100}
          value={currentMax}
          onChange={handleMaxChange}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-neutral text-xs">
        <span id={minLabelId}>{toDisplay(currentMin)}</span>
        <span id={maxLabelId}>{toDisplay(currentMax)}</span>
      </div>
    </div>
  );
};
