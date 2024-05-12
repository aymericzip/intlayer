import type { LucideIcon } from 'lucide-react';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
} from 'react';
import { styled } from 'styled-components';
import tw, { type TwStyle } from 'twin.macro';
import { Loader, type LoaderProps } from '../Loader';

type Variant = 'default' | 'outline' | 'link' | 'invisible-link' | 'none';
type Color =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'neutral'
  | 'light'
  | 'dark'
  | 'text';
type Size = 'sm' | 'lg' | 'icon';

type ButtonStyleProps = {
  $variant: Variant;
  $color: Color;
  $size: Size;
};

const sizeVariant: Record<Size, TwStyle> = {
  sm: tw`h-8 gap-1 px-3 text-xs`,
  lg: tw`h-10 px-8`,
  icon: tw`p-0`,
};

const colorVariant: Record<Color, TwStyle> = {
  primary: tw`border-primary dark:border-primary-dark bg-primary dark:bg-primary-dark text-primary dark:text-primary-dark hover:bg-primary-500 hover:dark:bg-primary-300`,
  secondary: tw`border-secondary dark:border-secondary-dark bg-secondary dark:bg-secondary-dark text-secondary dark:text-secondary-dark hover:bg-secondary-300 hover:dark:bg-secondary-100`,
  destructive: tw`border-destructive dark:border-destructive-dark bg-destructive dark:bg-destructive-dark text-destructive hover:bg-destructive-500 hover:dark:bg-destructive-200`,
  neutral: tw`border-neutral dark:border-neutral-dark bg-neutral hover:bg-neutral-dark text-neutral dark:text-neutral-dark hover:bg-neutral-700 hover:dark:bg-neutral-500`,
  light: tw`border-white border-white bg-white text-white hover:bg-neutral-50`,
  dark: tw`border-neutral-800 bg-neutral-800 text-neutral-800 hover:bg-neutral-900 dark:hover:bg-neutral-700`,
  text: tw`border-text dark:border-text-dark bg-text dark:bg-text-dark text-text dark:text-text-dark`,
};

const variantVariant: Record<Variant, TwStyle> = {
  default: tw`rounded-lg text-text-opposite dark:text-text-opposite-dark`,
  none: tw`bg-opacity-0 hover:bg-opacity-0 dark:bg-opacity-0 dark:hover:bg-opacity-0 border-none text-inherit dark:text-inherit`,
  outline: tw`border bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-30 rounded-lg border-[1.5px]`,
  link: tw`h-auto justify-start border-inherit bg-transparent dark:bg-transparent hover:bg-transparent p-0 underline-offset-4 hover:underline`,
  'invisible-link': tw`h-auto justify-start border-inherit bg-transparent dark:bg-transparent hover:bg-transparent p-0 underline-offset-4`,
};

const StyledButton = styled.button<ButtonStyleProps>`
  ${tw`inline-flex items-center whitespace-nowrap text-sm font-medium focus-visible:outline-none gap-2 transition disabled:pointer-events-none disabled:opacity-50`}
  ${({ $size }) => sizeVariant[$size]}
  ${({ $color }) => colorVariant[$color]}
  ${({ $variant }) => variantVariant[$variant]}
`;

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  /**
   * Optional icon to be displayed on the button
   */
  Icon?: FC | LucideIcon;
  iconClassName?: string;
  isLoading?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  label: string;
  // Styling props
  variant?: Variant;
  color?: Color;
  size?: Size;
};

type ButtonIconStyleProps = {
  $size: Size;
};

const iconSizeVariant: Record<Size, TwStyle> = {
  sm: tw`w-3`,
  lg: tw`w-5`,
  icon: tw`w-6`,
};

type ButtonIconProps = {
  Icon?: LucideIcon | FC;
  isLoading: boolean;
  size?: Size;
} & LoaderProps;

const ButtonIcon: FC<ButtonIconProps> = ({
  Icon,
  isLoading,
  ...loaderProps
}) => (isLoading ? <Loader {...loaderProps} /> : Icon && <Icon />);
const StyledButtonIcon = styled(ButtonIcon)<ButtonIconStyleProps>(
  ({ $size }) => iconSizeVariant[$size]
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'none',
      size = 'sm',
      color = 'primary',
      children,
      Icon,
      iconClassName,
      isLoading = false,
      isActive,
      disabled,
      label,
      ...props
    },
    ref
  ) => {
    const isLink = variant === 'link' || variant === 'invisible-link';

    return (
      <StyledButton
        ref={ref}
        disabled={isLoading ?? disabled}
        aria-current={isActive}
        aria-label={label}
        aria-busy={isLoading}
        role={isLink ? 'link' : undefined}
        $variant={variant}
        $color={color}
        $size={size}
        {...props}
      >
        {StyledButtonIcon ? (
          <>
            <StyledButtonIcon
              className={iconClassName}
              $size={size}
              isLoading={isLoading}
              Icon={Icon}
            />
            {children}
          </>
        ) : (
          children
        )}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
