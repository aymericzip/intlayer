import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
} from 'react';
import { Loader } from '../Loader';

export enum ButtonSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  ICON_SM = 'icon-sm',
  ICON_MD = 'icon-md',
  ICON_LG = 'icon-lg',
  ICON_XL = 'icon-xl',
}

export enum ButtonIconPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

const buttonIconVariants = cva('', {
  variants: {
    size: {
      [ButtonSize.SM]: 'size-3 absolute top-1/2 -translate-y-1/2',
      [ButtonSize.MD]: 'size-4 absolute top-1/2 -translate-y-1/2',
      [ButtonSize.LG]: 'size-5 absolute top-1/2 -translate-y-1/2',
      [ButtonSize.XL]: 'size-6 absolute top-1/2 -translate-y-1/2',
      [ButtonSize.ICON_SM]: 'size-3',
      [ButtonSize.ICON_MD]: 'size-4',
      [ButtonSize.ICON_LG]: 'size-5',
      [ButtonSize.ICON_XL]: 'size-6',
    },
    position: {
      [ButtonIconPosition.LEFT]: 'left-3',
      [ButtonIconPosition.RIGHT]: 'right-3',
    },
  },
  defaultVariants: {
    size: ButtonSize.MD,
  },
});

export enum ButtonVariant {
  DEFAULT = 'default',
  NONE = 'none',
  OUTLINE = 'outline',
  LINK = 'link',
  INVISIBLE_LINK = 'invisible-link',
  HOVERABLE = 'hoverable',
  INPUT = 'input',
}

export enum ButtonColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DESTRUCTIVE = 'destructive',
  NEUTRAL = 'neutral',
  LIGHT = 'light',
  DARK = 'dark',
  TEXT = 'text',
  TEXT_INVERSE = 'text-inverse',
  ERROR = 'error',
  SUCCESS = 'success',
  CUSTOM = 'custom',
}

export enum ButtonTextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

const buttonVariants = cva(
  'relative cursor-pointer truncate whitespace-nowrap font-medium transition focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        [ButtonSize.SM]: 'min-h-7 px-3 max-md:py-1 text-xs',
        [ButtonSize.MD]: 'min-h-8 px-6 max-md:py-2 text-sm',
        [ButtonSize.LG]: 'min-h-10 px-8 max-md:py-3 text-lg',
        [ButtonSize.XL]: 'min-h-11 px-10 max-md:py-4 text-xl',
        [ButtonSize.ICON_SM]: 'p-1.5',
        [ButtonSize.ICON_MD]: 'p-1.5',
        [ButtonSize.ICON_LG]: 'p-2',
        [ButtonSize.ICON_XL]: 'p-3',
      },
      color: {
        [ButtonColor.PRIMARY]: 'text-primary *:text-text-light',
        [ButtonColor.SECONDARY]: 'text-secondary *:text-text-light',
        [ButtonColor.DESTRUCTIVE]: 'text-destructive *:text-text-light',
        [ButtonColor.NEUTRAL]: 'text-neutral *:text-text-light',
        [ButtonColor.LIGHT]: 'text-white *:text-text-light',
        [ButtonColor.DARK]: 'text-neutral-800 *:text-text-light',
        [ButtonColor.TEXT]: 'text-text *:text-text-opposite',
        [ButtonColor.TEXT_INVERSE]: 'text-text-opposite *:text-text',
        [ButtonColor.ERROR]: 'text-error *:text-text-light',
        [ButtonColor.SUCCESS]: 'text-success *:text-text-light',
        [ButtonColor.CUSTOM]: '',
      },
      variant: {
        [ButtonVariant.DEFAULT]: 'rounded-lg bg-current',
        [ButtonVariant.NONE]:
          'border-none bg-current/0 text-inherit hover:bg-current/0',
        [ButtonVariant.OUTLINE]:
          '*:!text-current rounded-lg border-[1.5px] bg-current/0 hover:bg-current/30',
        [ButtonVariant.LINK]:
          '*:!text-current h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent hover:underline',
        [ButtonVariant.INVISIBLE_LINK]:
          '*:!text-current h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent',
        [ButtonVariant.HOVERABLE]:
          '*:!text-current rounded-lg border-none bg-current/0 transition hover:bg-current/10 aria-[current]:bg-current/5',
        [ButtonVariant.INPUT]: [
          '*:!text-current w-full select-text resize-none rounded-xl border-2 bg-input-background text-sm text-input-text shadow-none outline-0 transition-all',
          'border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none]',
          'aria-[invalid=true]:border-error',
          'disabled:opacity-50',
        ],
      },

      textAlign: {
        [ButtonTextAlign.LEFT]: 'text-left',
        [ButtonTextAlign.CENTER]: 'text-center',
        [ButtonTextAlign.RIGHT]: 'text-right',
      },

      isFullWidth: {
        true: 'w-full',
        false: '',
      },

      hasIconLeft: {
        true: 'px-12',
        false: '',
      },
      hasIconRight: {
        true: 'pr-8',
        false: '',
      },
    },
    defaultVariants: {
      variant: ButtonVariant.DEFAULT,
      size: ButtonSize.MD,
      color: ButtonColor.PRIMARY,
      textAlign: ButtonTextAlign.CENTER,
      isFullWidth: false,
      hasIconRight: false,
      hasIconLeft: false,
    },
  }
);

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  VariantProps<typeof buttonVariants> & {
    /**
     * Optional icon to be displayed on the button
     */
    label: string;
    Icon?: FC | LucideIcon;
    IconRight?: FC | LucideIcon;
    iconClassName?: string;
    isLoading?: boolean;
    isActive?: boolean;
    isFullWidth?: boolean;
  };

export const Button: FC<ButtonProps> = ({
  variant,
  size,
  color,
  children,
  Icon,
  IconRight,
  iconClassName,
  isLoading,
  isActive,
  isFullWidth = false,
  textAlign,
  disabled,
  label,
  className,
  type = 'button',
  ...props
}) => {
  const isLink = variant === 'link' || variant === 'invisible-link';

  return (
    <button
      disabled={isLoading || disabled}
      aria-current={isActive ? 'page' : undefined}
      aria-label={label}
      aria-busy={isLoading}
      role={isLink ? 'link' : undefined}
      type={type}
      className={buttonVariants({
        variant,
        size,
        color,
        isFullWidth,
        textAlign:
          textAlign ??
          (IconRight ? ButtonTextAlign.LEFT : ButtonTextAlign.CENTER),
        hasIconLeft: Boolean(
          typeof children !== 'undefined' &&
            (typeof Icon !== 'undefined' || typeof isLoading !== 'undefined')
        ),
        hasIconRight: Boolean(
          typeof children !== 'undefined' && typeof IconRight !== 'undefined'
        ),
        className,
      })}
      {...props}
    >
      {Icon && !isLoading && (
        <Icon
          className={buttonIconVariants({
            size,
            className: iconClassName,
            position: ButtonIconPosition.LEFT,
          })}
        />
      )}

      <Loader
        className={buttonIconVariants({
          size,
          className: iconClassName,
          position: ButtonIconPosition.LEFT,
        })}
        isLoading={isLoading ?? false}
      />

      <span>{children}</span>

      {IconRight && (
        <IconRight
          className={buttonIconVariants({
            size,
            className: iconClassName,
            position: ButtonIconPosition.RIGHT,
          })}
        />
      )}
    </button>
  );
};
