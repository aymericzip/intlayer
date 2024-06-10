'use client';

import { motion } from 'framer-motion';
import React, { type HTMLAttributes, type FC } from 'react';

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
  <motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: false }}
    transition={{
      delay: 0.8,
    }}
    {...props}
  >
    {children}
  </motion.p>
);
