'use client';

import { domAnimation, LazyMotion } from 'framer-motion';
import type { FC, PropsWithChildren } from 'react';

export const AnimatePresenceProvider: FC<PropsWithChildren> = ({
  children,
}) => <LazyMotion features={domAnimation}>{children}</LazyMotion>;
