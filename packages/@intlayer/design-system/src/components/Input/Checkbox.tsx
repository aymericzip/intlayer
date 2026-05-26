import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

export const checkboxVariants = cva(
  [
    'appearance-none',
    'relative cursor-pointer border-2',
    'focus:outline-0',
    'checked:hover:opacity-80',
    'ring-offset-background',
    'hover:bg-neutral-500/10',
    'disabled:opacity-50',

    // Ring + animation
    'ring-0 transition-all duration-300 ease-in-out hover:ring-4 focus-visible:ring-6',

    // centered custom checkmark with text-opposite color
    "checked:before:absolute checked:before:inset-0 checked:before:content-['✓']",
    'checked:before:flex checked:before:items-center checked:before:justify-center',
    'checked:before:text-text-opposite/80',

    // Corner shape
    'rounded-xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl',

    "after:absolute after:-inset-2 after:content-['']",
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        xs: 'size-3 rounded-sm',
        sm: 'size-4 rounded-md',
        md: 'size-5 rounded-lg',
        lg: 'size-6 rounded-xl',
      },
      color: {
        primary:
          'border-primary/30 text-primary ring-primary/20 checked:border-primary checked:bg-primary',
        secondary:
          'border-secondary/30 text-secondary ring-secondary/20 checked:border-secondary checked:bg-secondary',
        neutral:
          'border-neutral/30 text-neutral ring-neutral/20 checked:border-neutral checked:bg-neutral',
        light:
          'border-white/30 text-white ring-white/20 checked:border-white checked:bg-white',
        text: 'border-text/30 text-text ring-text/20 checked:border-text checked:bg-text',
        ['text-inverse']:
          'border-text-inverse/30 text-text-inverse ring-text-inverse/20 checked:border-text-inverse checked:bg-text-inverse',
        dark: 'border-neutral-800/30 text-neutral-800 ring-neutral-800/20 checked:border-neutral-800 checked:bg-neutral-800',
        error:
          'border-error/30 text-error ring-error/20 checked:border-error checked:bg-error',
        success:
          'border-success/30 text-success ring-success/20 checked:border-success checked:bg-success',
        custom:
          'border-custom/30 text-custom ring-custom/20 checked:border-custom checked:bg-custom',
      },
      validationStyleEnabled: {
        disabled: '',
        enabled: 'valid:border-success invalid:border-error',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'text',
      validationStyleEnabled: 'disabled',
      size: 'md',
    },
  }
);

export enum CheckboxSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export enum CheckboxColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  NEUTRAL = 'neutral',
  LIGHT = 'light',
  TEXT = 'text',
  TEXT_INVERSE = 'text-inverse',
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
        props.size === 'xs' && 'text-xs',
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
