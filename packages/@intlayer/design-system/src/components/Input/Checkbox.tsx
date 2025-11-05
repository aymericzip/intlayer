import { cva, type VariantProps } from 'class-variance-authority';
import type {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { cn } from '../../utils/cn';

export const checkboxVariants = cva('', {
  variants: {
    variant: {
      default: [
        'pointer rounded border-2 bg-input-background text-input-text shadow-none outline-0 transition-all',
        'border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none]',
        'checked:border-checkbox-checked-border checked:bg-checkbox-checked',
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

export enum CheckboxSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export enum CheckboxColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DESTRUCTIVE = 'destructive',
  NEUTRAL = 'neutral',
  LIGHT = 'light',
  TEXT = 'text',
  DARK = 'dark',
  ERROR = 'error',
  SUCCESS = 'success',
  CUSTOM = 'custom',
}

export type CheckboxProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
> & {
  name: string;
  validationStyleEnabled?: boolean;
  label?: ReactNode;
} & Omit<
    VariantProps<typeof checkboxVariants>,
    'validationStyleEnabled' | 'size' | 'color'
  > & {
    size?: CheckboxSize | `${CheckboxSize}`;
    color?: CheckboxColor | `${CheckboxColor}`;
    labelClassName?: string;
  };

const Input: FC<CheckboxProps> = ({
  validationStyleEnabled = false,
  label,
  size,
  color,
  name,
  variant,
  className,
  labelClassName,
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
      className={cn(
        'flex w-full cursor-pointer items-center gap-x-4 font-medium text-sm',
        props.labelClassName
      )}
    >
      <Input id={id ?? name} {...props} />
      {label}
    </label>
  ) : (
    <Input id={id ?? name} {...props} />
  );
};
