import { useEffect, useRef, useState } from 'react';

/** Default duration (ms) of a curve morph. */
const DEFAULT_ANIMATION_DURATION_MS = 500;

/**
 * Resamples `values` to `length` evenly spaced points by linear
 * interpolation, so two series of different sizes can be tweened.
 */
export const resampleValues = (
  values: readonly number[],
  length: number
): number[] => {
  if (length <= 0) return [];
  if (values.length === 0) return Array.from({ length }, () => 0);
  if (values.length === 1 || length === 1) {
    return Array.from({ length }, () => values[0]);
  }

  const scale = (values.length - 1) / (length - 1);

  return Array.from({ length }, (_value, index) => {
    const position = index * scale;
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.min(values.length - 1, lowerIndex + 1);
    const weight = position - lowerIndex;

    return (
      values[lowerIndex] + (values[upperIndex] - values[lowerIndex]) * weight
    );
  });
};

/** Ease-out cubic: fast start, gentle landing. */
const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3;

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Morphs a series of `[0, 1]` ratios toward `targetRatios` whenever it
 * changes, starting from what is currently displayed. Disabled or with
 * reduced motion, returns `targetRatios` as is.
 *
 * @param targetRatios - Memoized ratios to reach (a new identity restarts the morph).
 * @param isEnabled - Turns the animation off (e.g. for bar charts).
 */
export const useAnimatedRatios = (
  targetRatios: readonly number[],
  isEnabled: boolean,
  durationMs: number = DEFAULT_ANIMATION_DURATION_MS
): readonly number[] => {
  const [displayedRatios, setDisplayedRatios] = useState(targetRatios);
  const displayedRatiosRef = useRef(targetRatios);

  useEffect(() => {
    const startRatios = resampleValues(
      displayedRatiosRef.current,
      targetRatios.length
    );

    const isUnchanged = startRatios.every(
      (startRatio, index) => startRatio === targetRatios[index]
    );

    if (!isEnabled || isUnchanged || prefersReducedMotion()) {
      displayedRatiosRef.current = targetRatios;
      return;
    }

    const startTime = performance.now();
    let frameId = 0;

    const renderFrame = (now: number) => {
      const progress = Math.min(1, (now - startTime) / durationMs);
      const easedProgress = easeOutCubic(progress);
      const frameRatios = targetRatios.map(
        (targetRatio, index) =>
          startRatios[index] +
          (targetRatio - startRatios[index]) * easedProgress
      );

      displayedRatiosRef.current = frameRatios;
      setDisplayedRatios(frameRatios);

      // Stops once landed: no idle rAF loop left running
      if (progress < 1) frameId = requestAnimationFrame(renderFrame);
    };

    frameId = requestAnimationFrame(renderFrame);

    return () => cancelAnimationFrame(frameId);
  }, [targetRatios, isEnabled, durationMs]);

  if (!isEnabled) return targetRatios;

  // Until the first frame paints, never show a series of the wrong length
  return displayedRatios.length === targetRatios.length
    ? displayedRatios
    : resampleValues(displayedRatios, targetRatios.length);
};
