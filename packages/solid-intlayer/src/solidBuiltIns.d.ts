import type { Component, JSX } from 'solid-js';

/**
 * Solid JSX compiler built-ins. Used as a JSX tag and left unimported, each is
 * imported by the compiler of the consuming app from its own web runtime
 * (`solid-js/web` in Solid 1, `@solidjs/web` in Solid 2), so this package never
 * pins one of those modules.
 *
 * Use them only as JSX tags — a value reference is not rewritten. `Suspense`
 * exists in Solid 1 only and `Loading` in Solid 2 only: keep each behind an
 * `isSolidTwo` branch so the other never evaluates.
 */
declare global {
  const Dynamic: typeof import('solid-js/web').Dynamic;
  const Suspense: typeof import('solid-js').Suspense;
  const Loading: Component<{ fallback?: JSX.Element; children: JSX.Element }>;
}
