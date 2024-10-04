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
>((props, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn(error && 'text-error dark:text-error-dark')}
      ref={ref}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';
