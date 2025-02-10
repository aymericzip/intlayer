'use client';

import { Slot } from '@radix-ui/react-slot';
import type { FC, ComponentProps } from 'react';
import { useFormField } from './FormField';

export const FormControl: FC<ComponentProps<typeof Slot>> = (props, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
};
