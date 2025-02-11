'use client';

import { type FC, type HTMLAttributes } from 'react';
import { useFormField } from './FormField';

export const FormDescription: FC<HTMLAttributes<HTMLParagraphElement>> = (
  props
) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      className="text-neutral dark:text-neutral-dark text-sm"
      id={formDescriptionId}
      {...props}
    />
  );
};
