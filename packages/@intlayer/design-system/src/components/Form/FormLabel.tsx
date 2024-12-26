'use client';

import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '../../utils/cn';
import { Label } from '../Label';
import { useFormField } from './FormField';

export const FormLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn(
        'mb-2',
        error && 'text-error dark:text-error-dark',
        className
      )}
      ref={ref}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';
