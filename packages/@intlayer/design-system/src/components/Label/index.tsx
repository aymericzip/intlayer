'use client';

import { forwardRef, type LabelHTMLAttributes } from 'react';
import tw from 'twin.macro';

const StyledLabel = tw.label`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`;

export const Label = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(({ htmlFor, ...props }, ref) => (
  <StyledLabel ref={ref} htmlFor={htmlFor} {...props} />
));
Label.displayName = 'Label';
