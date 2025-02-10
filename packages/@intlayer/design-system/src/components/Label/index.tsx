import { FC, type LabelHTMLAttributes } from 'react';

export const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
  htmlFor,
  ...props
}) => (
  <label
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    ref={ref}
    htmlFor={htmlFor}
    {...props}
  />
);
