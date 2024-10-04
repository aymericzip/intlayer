'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { useFormField } from './FormField';

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      className="text-sm text-gray-500 dark:text-gray-400"
      ref={ref}
      id={formDescriptionId}
      {...props}
    />
  );
});

FormDescription.displayName = 'FormDescription';
