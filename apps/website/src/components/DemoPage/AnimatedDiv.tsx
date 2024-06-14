'use client';

import { motion } from 'framer-motion';
import type { FC, HTMLAttributes, ReactNode } from 'react';

type AnimatedDivProps = {
  children?: ReactNode;
} & Pick<HTMLAttributes<HTMLDivElement>, 'className'>;

export const AnimatedDiv: FC<AnimatedDivProps> = ({ children, ...props }) => (
  <motion.div
    initial={{ opacity: 0, translateY: '100px' }}
    whileInView={{ opacity: 1, translateY: '0px' }}
    viewport={{ once: false }}
    {...props}
  >
    {children}
  </motion.div>
);
