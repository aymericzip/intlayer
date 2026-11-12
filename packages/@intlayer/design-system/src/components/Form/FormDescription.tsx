'use client';

import type { FC, HTMLAttributes } from 'react';
import { useFormField } from './FormField';

export const FormDescription: FC<HTMLAttributes<HTMLParagraphElement>> = (
  props
) => {
  const { formDescriptionId } = useFormField();

  return (
    <p className="text-sm text-neutral" id={formDescriptionId} {...props} />
  );
};
