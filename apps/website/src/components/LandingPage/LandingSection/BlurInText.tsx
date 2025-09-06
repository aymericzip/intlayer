'use client';

import { cn } from '@utils/cn';
import { motion, type Variants } from 'framer-motion';
import type { FC } from 'react';

interface BlurInTextProps {
  text: string;
  className?: string;
  variant?: Variants;
  duration?: number;
}

export const BlurInText: FC<BlurInTextProps> = ({
  text,
  className,
  variant,
  duration = 0.5,
}) => {
  const defaultVariants: Variants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(
        'font-display text-center text-4xl font-bold tracking-[-0.02em] text-white drop-shadow-sm md:text-7xl md:leading-[5rem]',
        className
      )}
    >
      {text}
    </motion.h1>
  );
};
