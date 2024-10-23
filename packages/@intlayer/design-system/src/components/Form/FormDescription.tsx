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
      className="text-neutral dark:text-neutral-dark text-sm"
      ref={ref}
      id={formDescriptionId}
      {...props}
    />
  );
});

FormDescription.displayName = 'FormDescription';
