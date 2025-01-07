import type { FC, HTMLAttributes } from 'react';
// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import { cn } from '../../utils/cn';
import loaderContent from './index.content';
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
}) => {
  const { label } = useDictionary(loaderContent);

  return isLoading ? (
    <div
      className={cn(
        'flex size-full max-h-screen max-w-[100vw] flex-1 items-center justify-center',
        className
      )}
      role="status"
      aria-label={label}
      {...props}
    >
      <Spinner className="size-10 max-h-full max-w-full" />
    </div>
  ) : (
    (children ?? <></>)
  );
};
