import type { FC, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from './spinner';

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  isLoading?: boolean;
};

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
  className,
  ...props
}) => (
  <>
    {isLoading ? (
      <div
        className={cn(
          'flex size-full max-h-screen max-w-[100vw] flex-1 items-center justify-center',
          className
        )}
        role="status"
        aria-label="Animated icon, meaning that the website is processing"
        {...props}
      >
        <Spinner className="size-10 max-h-full max-w-full" />
      </div>
    ) : (
      (children ?? <></>)
    )}
  </>
);
