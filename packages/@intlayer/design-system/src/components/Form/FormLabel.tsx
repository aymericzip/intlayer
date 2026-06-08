'use client';

import { cn } from '@utils/cn';
import type { ComponentProps, FC } from 'react';
import { Label } from '../Label';
import { useFormField } from './FormField';

export const FormLabel: FC<ComponentProps<typeof Label>> = ({
  className,
  ...props
}) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn('mb-2', error && 'text-error', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
};
