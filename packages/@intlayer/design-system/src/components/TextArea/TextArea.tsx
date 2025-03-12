import type { VariantProps } from 'class-variance-authority';
import {
  type TextareaHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
} from 'react';
import { cn } from '../../utils/cn';
import { inputVariants } from '../Input';

type LabelType =
  | {
      'aria-labelledby': string;
    }
  | {
      'aria-label': string;
    };

export type TextAreaProps = DetailedHTMLProps<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  HTMLTextAreaElement
> & {
  validationStyleEnabled?: boolean;
} & Omit<VariantProps<typeof inputVariants>, 'validationStyleEnabled'> &
  LabelType;

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
