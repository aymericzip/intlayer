import type { FC, HTMLAttributes } from 'react';
import tw from 'twin.macro';
import { Spinner } from './spinner';

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}

const StyledContainer = tw.div`max-w-[100vw] flex size-full max-h-screen items-center justify-center`;
const StyledSpinner = tw(Spinner)`w-10 h-10`;

/**
 *
 * Component can be use as a wrapper or standalone
 *
 * Example:
 * ```jsx
 * <Loader isLoading={isLoading}>
 *   <div>Content</div>
 * </Loader>
 * ```
 * or
 * ```jsx
 * <Loader isLoading={isLoading} />
 * ```
 *
 * if isLoading is undefined, it will default to true
 * ```jsx
 * <Loader />
 * ```
 */
export const Loader: FC<LoaderProps> = ({
  children,
  isLoading = true,
  ...props
}) =>
  isLoading ? (
    <StyledContainer
      role="status"
      aria-label="Animated icon, meaning that the website is processing"
      {...props}
    >
      <StyledSpinner />
    </StyledContainer>
  ) : (
    children ?? <></>
  );
