import type { FC, HTMLAttributes } from 'react';
import tw from 'twin.macro';
import { Spinner } from './spinner';

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}

const StyledContainer = tw.div`max-w-[100vw] flex size-full max-h-screen items-center justify-center`;

// Component can be use as a wrapper or standalone
// Example:
// <Loader isLoading={isLoading}>
//   <div>Content</div>
// </Loader>
// or
// <Loader isLoading={isLoading} />

// if isLoading is undefined, it will default to true
// <Loader />

export const Loader: FC<LoaderProps> = ({
  className,
  children,
  isLoading = true,
  ...props
}) => {
  return isLoading ? (
    <StyledContainer
      aria-label="Animated icon, meaning that the website is processing"
      {...props}
    >
      <Spinner />
    </StyledContainer>
  ) : (
    <>{children ?? <></>}</>
  );
};
