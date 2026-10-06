import { domAnimation, LazyMotion } from 'framer-motion';
import type { FunctionComponent } from 'preact';

export const AnimatePresenceProvider: FunctionComponent = ({ children }) => (
  <LazyMotion features={domAnimation}>{children}</LazyMotion>
);
