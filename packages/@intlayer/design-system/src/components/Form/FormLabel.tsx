'use client';

import { type ComponentProps, type FC } from 'react';
import { cn } from '../../utils/cn';
import { Label } from '../Label';
import { useFormField } from './FormField';

export const FormLabel: FC<ComponentProps<typeof Label>> = ({
  className,
  ...props
}) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn(
        'mb-2',
        error && 'text-error dark:text-error-dark',
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
};
