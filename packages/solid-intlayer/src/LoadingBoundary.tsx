import type { Component } from 'solid-js';
import { isSolidTwo } from './solidCompat';
import type { SolidElement } from './solidTypes';

export type LoadingBoundaryProps = {
  fallback?: SolidElement;
  children: SolidElement;
};

/**
 * Shows `fallback` while async reads below it are pending: `Suspense` in
 * Solid 1, `Loading` in Solid 2. Both are compiler built-ins, auto-imported
 * from the app's own web runtime; only the branch of the installed version is
 * ever evaluated.
 */
export const LoadingBoundary: Component<LoadingBoundaryProps> = (props) =>
  isSolidTwo ? (
    // oxlint-disable-next-line react/jsx-no-undef -- Solid 2 compiler built-in
    <Loading fallback={props.fallback}>{props.children}</Loading>
  ) : (
    // oxlint-disable-next-line react/jsx-no-undef -- Solid 1 compiler built-in
    <Suspense fallback={props.fallback}>{props.children}</Suspense>
  );
