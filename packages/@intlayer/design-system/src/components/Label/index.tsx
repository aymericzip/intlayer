import { forwardRef, type LabelHTMLAttributes } from 'react';

export const Label = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(({ htmlFor, ...props }, ref) => (
  <label
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    ref={ref}
    htmlFor={htmlFor}
    {...props}
  />
));
Label.displayName = 'Label';
