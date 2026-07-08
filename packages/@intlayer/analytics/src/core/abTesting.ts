import { hashString } from '../utils/hash';

/**
 * Deterministically assigns a variant to a session for a given experiment.
 *
 * The assignment is a pure function of `sessionId` + `experimentKey`, so it is
 * stable for the whole session and requires **no** server round-trip before the
 * first render — avoiding layout shift / content flicker. Optional `weights`
 * bias the split (e.g. `[0.9, 0.1]` for a 90/10 rollout).
 *
 * @param sessionId - The current anonymous session id.
 * @param experimentKey - Unique key identifying the experiment.
 * @param variants - The candidate variant names (at least one).
 * @param weights - Optional relative weights, one per variant.
 * @returns The variant assigned to this session.
 *
 * @example
 * assignVariant('sid-1', 'homepage-hero', ['a', 'b']);          // stable 'a' | 'b'
 * assignVariant('sid-1', 'homepage-hero', ['a', 'b'], [9, 1]);  // ~90% 'a'
 */
export const assignVariant = (
  sessionId: string,
  experimentKey: string,
  variants: string[],
  weights?: number[]
): string => {
  if (variants.length === 0) {
    throw new Error('assignVariant requires at least one variant');
  }
  if (variants.length === 1) return variants[0]!;

  // Uniform bucket in [0, 1) derived from the session + experiment.
  const bucket = hashString(`${sessionId}:${experimentKey}`) / 0x100000000;

  if (!weights || weights.length !== variants.length) {
    const index = Math.floor(bucket * variants.length);
    return variants[Math.min(index, variants.length - 1)];
  }

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  if (totalWeight <= 0) {
    return variants[Math.floor(bucket * variants.length)];
  }

  let cumulative = 0;
  const target = bucket * totalWeight;
  for (let index = 0; index < variants.length; index++) {
    cumulative += weights[index];
    if (target < cumulative) return variants[index];
  }

  return variants[variants.length - 1];
};
