'use client';

import { AnimatePresence } from 'framer-motion';
import type { FC, PropsWithChildren } from 'react';

export const AnimatePresenceProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <AnimatePresence>
    <>{children}</>
  </AnimatePresence>
);
