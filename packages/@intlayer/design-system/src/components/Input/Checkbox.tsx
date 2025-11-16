import { cva, type VariantProps } from 'class-variance-authority';
import type {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { cn } from '../../utils/cn';

export const checkboxVariants = cva(
  [
    'appearance-none',
    'pointer relative border-2',
    'focus:outline-0',
    'checked:border-current checked:bg-current checked:hover:bg-current/80',
    'ring-current/20 ring-offset-current',
    'hover:bg-current/20',
    'disabled:opacity-50',

    // Ring + animation
    'ring-0 transition-all duration-300 ease-in-out hover:ring-4 focus-visible:ring-6',

    // centered custom checkmark with text-opposite color
    "checked:before:absolute checked:before:inset-0 checked:before:content-['✓']",
    'checked:before:flex checked:before:items-center checked:before:justify-center',
    'checked:before:text-text-opposite/80',

    // Corner shape
    'rounded-xl supports-[corner-shape:squircle]:rounded-2xl',
    '[corner-shape:squircle]',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        sm: 'size-4 rounded-md',
        md: 'size-5 rounded-lg',
        lg: 'size-6 rounded-xl',
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
  }
);

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
    className={cn(
      checkboxVariants({
        variant,
        size,
        color,
        validationStyleEnabled: validationStyleEnabled ? 'enabled' : 'disabled',
      }),
      className
    )}
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
