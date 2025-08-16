import type { VariantProps } from 'class-variance-authority';
import {
  type DetailedHTMLProps,
  type FC,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '../../utils/cn';
import { InputVariant, inputVariants } from '../Input';

export type TextAreaProps = DetailedHTMLProps<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  HTMLTextAreaElement
> & {
  validationStyleEnabled?: boolean;
} & Omit<
    VariantProps<typeof inputVariants>,
    'validationStyleEnabled' | 'variant'
  > & {
    variant?: InputVariant | `${InputVariant}`;
  };

export const TextArea: FC<TextAreaProps> = ({
  className,
  variant,
  validationStyleEnabled = false,
  ...props
}) => (
  <textarea
    className={cn(
      'resize-none',
      inputVariants({
        variant,
        validationStyleEnabled: validationStyleEnabled ? 'enabled' : 'disabled',
        className,
      })
    )}
    {...props}
  />
);
