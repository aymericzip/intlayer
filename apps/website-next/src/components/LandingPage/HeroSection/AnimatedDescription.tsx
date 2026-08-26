'use client';

import { m } from 'framer-motion';
import type { FC, HTMLAttributes } from 'react';

type AnimatedDescriptionProps = Pick<
  HTMLAttributes<HTMLParagraphElement>,
  'className' | 'children'
>;

// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations
export const AnimatedDescription: FC<AnimatedDescriptionProps> = ({
  children,
  ...props
}) => (
  <m.p
    initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: false, amount: 0.4 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    {...props}
  >
    {children}
  </m.p>
);
