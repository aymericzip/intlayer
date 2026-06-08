import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

export const radioVariants = cva(
  [
    'appearance-none',
    'relative cursor-pointer rounded-full border-2',
    'focus:outline-0',
    'checked:hover:opacity-80',
    'ring-offset-background',
    'hover:bg-neutral-500/10',
    'disabled:opacity-50',

    // Ring + animation
    'ring-0 transition-all duration-300 ease-in-out hover:ring-4 focus-visible:ring-6',

    // Centered dot when checked
    'checked:before:absolute checked:before:inset-0 checked:before:flex',
    'checked:before:items-center checked:before:justify-center',
    "checked:before:content-['']",
    'checked:before:m-auto checked:before:size-[45%]',
    'checked:before:rounded-full checked:before:bg-text-opposite/80',

    "after:absolute after:-inset-2 after:content-['']",
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        xs: 'size-3',
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
      },
      color: {
        primary:
          'border-primary/30 ring-primary/20 checked:border-primary checked:bg-primary',
        secondary:
          'border-secondary/30 ring-secondary/20 checked:border-secondary checked:bg-secondary',
        neutral:
          'border-neutral/30 ring-neutral/20 checked:border-neutral checked:bg-neutral',
        light:
          'border-white/30 ring-white/20 checked:border-white checked:bg-white',
        text: 'border-text/30 ring-text/20 checked:border-text checked:bg-text',
        'text-inverse':
          'border-text-inverse/30 ring-text-inverse/20 checked:border-text-inverse checked:bg-text-inverse',
        dark: 'border-neutral-800/30 ring-neutral-800/20 checked:border-neutral-800 checked:bg-neutral-800',
        error:
          'border-error/30 ring-error/20 checked:border-error checked:bg-error',
        success:
          'border-success/30 ring-success/20 checked:border-success checked:bg-success',
        custom:
          'border-custom/30 ring-custom/20 checked:border-custom checked:bg-custom',
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

export type RadioSize = 'xs' | 'sm' | 'md' | 'lg';

export type RadioColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'light'
  | 'text'
  | 'text-inverse'
  | 'dark'
  | 'error'
  | 'success'
  | 'custom';

export type RadioProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'type'
> & {
  name: string;
  validationStyleEnabled?: boolean;
  label?: ReactNode;
} & Omit<
    VariantProps<typeof radioVariants>,
    'validationStyleEnabled' | 'size' | 'color'
  > & {
    size?: RadioSize | `${RadioSize}`;
    color?: RadioColor | `${RadioColor}`;
    labelClassName?: string;
  };

const RadioInput: FC<RadioProps> = ({
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
    type="radio"
    name={name}
    className={cn(
      radioVariants({
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

export const Radio: FC<RadioProps> = (props) => {
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
      <RadioInput id={id ?? name} {...props} />
      {label}
    </label>
  ) : (
    <RadioInput id={id ?? name} {...props} />
  );
};
