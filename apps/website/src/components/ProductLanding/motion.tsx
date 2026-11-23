import { cn } from '@intlayer/design-system/utils';
import { m, type Variants } from 'framer-motion';
import type { FC, PropsWithChildren } from 'react';

/** The one easing curve used across the product landing pages. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Short fade and 8px rise, used for every in-view entrance. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

type RevealProps = PropsWithChildren<{ className?: string }>;

/** Fades its content in once, when it scrolls into view. */
export const Reveal: FC<RevealProps> = ({ children, className }) => (
  <m.div
    className={className}
    variants={revealVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-64px' }}
  >
    {children}
  </m.div>
);

/** Staggers the entrance of its `RevealItem` children. */
export const RevealGroup: FC<RevealProps> = ({ children, className }) => (
  <m.div
    className={className}
    variants={groupVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-64px' }}
  >
    {children}
  </m.div>
);

/** One staggered item of a `RevealGroup`. */
export const RevealItem: FC<RevealProps> = ({ children, className }) => (
  <m.div className={cn(className)} variants={revealVariants}>
    {children}
  </m.div>
);
