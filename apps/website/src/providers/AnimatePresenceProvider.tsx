import { LazyMotion } from 'framer-motion';
import type { FC, PropsWithChildren } from 'react';

/**
 * Loads the DOM animation features on demand.
 *
 * Naming the feature bundle directly puts it in the entry graph of every page,
 * animated or not — the documentation pages downloaded and evaluated it to
 * animate nothing. Passing a loader instead lets it arrive after the page is
 * interactive; `m` components render their static output until it does.
 */
const loadDomAnimationFeatures = () =>
  import('framer-motion').then((mod) => mod.domAnimation);

export const AnimatePresenceProvider: FC<PropsWithChildren> = ({
  children,
}) => <LazyMotion features={loadDomAnimationFeatures}>{children}</LazyMotion>;
