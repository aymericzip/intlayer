import { cva, type VariantProps } from 'class-variance-authority';
import {
  ReactNode,
  type DetailedHTMLProps,
  type FC,
  type InputHTMLAttributes,
} from 'react';

export const checkboxVariants = cva('', {
  variants: {
    variant: {
      default: [
        'pointer rounded border-2 bg-input-background text-input-text shadow-none outline-0 transition-all',
        'border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none]',
        'checked:bg-checkbox-checked checked:border-checkbox-checked-border',
        'disabled:opacity-50',
      ],
    },
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
    color: {
      primary: 'accent-primary',
      secondary: 'accent-secondary',
      destructive: 'accent-destructive',
      neutral: 'accent-neutral',
      light: 'accent-light',
      text: 'accent-text',
      dark: 'accent-dark',
      error: 'accent-error',
      success: 'accent-success',
      custom: 'accent-custom',
    },
    validationStyleEnabled: {
      disabled: '',
      enabled: 'valid:border-success invalid:border-error',
    },
  },
  defaultVariants: {
    variant: 'default',
    color: 'primary',
    validationStyleEnabled: 'disabled',
    size: 'md',
  },
});

export type CheckboxProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
> & {
  name: string;
  validationStyleEnabled?: boolean;
  label?: ReactNode;
} & Omit<VariantProps<typeof checkboxVariants>, 'validationStyleEnabled'>;

const Input: FC<CheckboxProps> = ({
  validationStyleEnabled = false,
  label,
  size,
  color,
  name,
  variant,
  className,
  ...props
}) => (
  <input
    type="checkbox"
    className={checkboxVariants({
      variant,
      size,
      color,
      validationStyleEnabled: validationStyleEnabled ? 'enabled' : 'disabled',
      className,
    })}
    {...props}
  />
);

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { label, name, id } = props;

  return label ? (
    <label
      htmlFor={id ?? name}
      className="flex items-center gap-x-4 font-medium text-sm cursor-pointer"
    >
      <Input id={id ?? name} {...props} />
      {label}
    </label>
  ) : (
    <Input id={id ?? name} {...props} />
  );
};
