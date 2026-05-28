'use client';

import { m } from 'framer-motion';
import type { FC, HTMLAttributes, ReactNode } from 'react';

type AnimatedDivProps = {
  children?: ReactNode;
} & Pick<HTMLAttributes<HTMLDivElement>, 'className'>;

export const AnimatedDiv: FC<AnimatedDivProps> = ({ children, ...props }) => (
  <m.div
    initial={{ opacity: 0, translateY: '20px' }}
    whileInView={{ opacity: 1, translateY: '0px' }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    {...props}
  >
    {children}
  </m.div>
);
