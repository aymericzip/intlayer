import type { KeyPath } from '@intlayer/types/keyPath';

/**
 * Node metadata reported for a content exposure. Kept dependency-free (types
 * only) so the interpreter hot path in `plugins.ts` never statically imports
 * `@intlayer/analytics` — the package stays optional and tree-shakeable.
 */
export type ExposureInput = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: string;
  nodeType?: string;
};

/** Consumer of exposure reports, installed by `useAnalytics` after init. */
export type ExposureSink = (input: ExposureInput) => void;

let sink: ExposureSink | null = null;

/**
 * Installs (or clears) the exposure sink. `useAnalytics` sets this once the
 * analytics client has loaded, and clears it on unmount.
 *
 * @param next - The sink to install, or `null` to clear.
 */
export const setExposureSink = (next: ExposureSink | null): void => {
  sink = next;
};

/**
 * Forwards a content exposure to the installed sink. A cheap null-check when
 * analytics is not running, so it is safe to call from every node resolution.
 *
 * @param input - The node metadata to report.
 */
export const reportExposure = (input: ExposureInput): void => {
  sink?.(input);
};
