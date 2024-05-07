import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type DetailedHTMLProps, type HTMLAttributes } from 'react';
import { styled } from 'styled-components';

const containerVariants = cva(
  'flex flex-col justify-between rounded-lg shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur',
  {
    variants: {
      roundedSize: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        full: 'rounded-full',
      },
      transparency: {
        none: 'bg-card',
        sm: 'bg-card/80',
        md: 'bg-card/60',
        lg: 'bg-card/40',
        xl: 'bg-card/20',
      },
      padding: {
        none: 'p-0',
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-3',
        xl: 'p-4',
      },
    },
    defaultVariants: {
      roundedSize: 'md',
      transparency: 'md',
    },
  }
);

type ContainerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  VariantProps<typeof containerVariants>;

const StyledContainer = styled.div<VariantProps<typeof containerVariants>>(
  ({ roundedSize, padding, transparency, className }) =>
    containerVariants({
      roundedSize,
      padding,
      transparency,
      className,
    })
);

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { children, roundedSize, padding, transparency, className, ...props },
    ref
  ) => (
    <StyledContainer ref={ref} {...props}>
      {children}
    </StyledContainer>
  )
);

Container.displayName = 'Container';
