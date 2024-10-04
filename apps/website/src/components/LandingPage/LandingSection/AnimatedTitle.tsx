'use client';

import { m } from 'framer-motion';
import React, { type HTMLAttributes, type FC } from 'react';

type AnimatedCharactersProps = {
  text: string;
} & HTMLAttributes<HTMLDivElement>;

// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations
export const AnimatedTitle: FC<AnimatedCharactersProps> = ({
  text,
  ...props
}) => (
  <h1 {...props}>
    {text.split(' ').map((el, i) => (
      <m.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.25,
          delay: i / 10,
        }}
        key={el}
      >
        {el}{' '}
      </m.span>
    ))}
  </h1>
);
