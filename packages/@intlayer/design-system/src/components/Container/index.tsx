import { type PropsWithChildren, forwardRef, type HTMLAttributes } from 'react';
import { css, styled } from 'styled-components';
import tw, { type TwStyle } from 'twin.macro';

// Define a basic container with default styles
const BaseContainer = styled.div(() => [
  tw`flex flex-col justify-between shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] shadow-sm backdrop-blur`,
  css`
    -webkit-backdrop-filter: var(--tw-backdrop-blur)
      var(--tw-backdrop-brightness) var(--tw-backdrop-contrast)
      var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate)
      var(--tw-backdrop-invert) var(--tw-backdrop-opacity)
      var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  `,
]);

type RoundedSize = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
type Transparency = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type Padding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type Separator = 'without' | 'x' | 'y' | 'both';

// Variant configurations using twin.macro utilities directly
const roundedSizeVariants: Record<RoundedSize, TwStyle> = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  '2xl': tw`rounded-2xl`,
  '3xl': tw`rounded-3xl`,
  full: tw`rounded-full`,
};

const transparencyVariants: Record<Transparency, TwStyle> = {
  none: tw`bg-card dark:bg-card-dark`,
  sm: tw`bg-card/80 dark:bg-card-dark/80`,
  md: tw`bg-card/60 dark:bg-card-dark/60`,
  lg: tw`bg-card/40 dark:bg-card-dark/40`,
  xl: tw`bg-card/20 dark:bg-card-dark/20`,
};

const paddingVariants: Record<Padding, TwStyle> = {
  none: tw`p-0`,
  sm: tw`p-1`,
  md: tw`p-2`,
  lg: tw`p-3`,
  xl: tw`p-4`,
};

const separatorVariants: Record<Separator, TwStyle> = {
  without: tw``,
  x: tw`divide-x divide-dashed divide-text/20 dark:divide-text-dark/20`,
  y: tw`divide-y divide-dashed divide-text/20 dark:divide-text-dark/20`,
  both: tw`divide-x divide-y divide-dashed divide-text/20 dark:divide-text-dark/20`,
};

type ContainerStyleProps = {
  $roundedSize?: RoundedSize;
  $transparency?: Transparency;
  $padding?: Padding;
  $separator?: Separator;
};

export const getContainerStyles = ({
  $roundedSize = 'md',
  $transparency = 'md',
  $padding = 'none',
  $separator = 'without',
}: ContainerStyleProps): TwStyle[] => [
  roundedSizeVariants[$roundedSize],
  transparencyVariants[$transparency],
  paddingVariants[$padding],
  separatorVariants[$separator],
];

// Extended styled component with dynamic styling based on props
const StyledContainer =
  styled(BaseContainer)<ContainerStyleProps>(getContainerStyles);

type ContainerProps = PropsWithChildren<{
  roundedSize?: RoundedSize;
  transparency?: Transparency;
  padding?: Padding;
  separator?: Separator;
}> &
  HTMLAttributes<HTMLDivElement>;

// Container component
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { children, roundedSize, padding, transparency, separator, ...props },
    ref
  ) => (
    <StyledContainer
      ref={ref}
      $roundedSize={roundedSize}
      $padding={padding}
      $transparency={transparency}
      $separator={separator}
      {...props}
    >
      {children}
    </StyledContainer>
  )
);

Container.displayName = 'Container';
