import { cn } from '@utils/cn';
import type { HTMLAttributes } from 'react';

type Align = 'left' | 'right';

type MaxWidthSmootherProps = HTMLAttributes<HTMLDivElement> & {
  isHidden: boolean;
  minWidth?: number;
  align?: Align;
};

export const MaxWidthSmoother = ({
  children,
  isHidden,
  minWidth = 0,
  align = 'left',
  className,
  ...props
}: MaxWidthSmootherProps) => (
  <div
    className={cn(
      'relative grid h-full grid-cols-[0fr] overflow-x-hidden overflow-y-hidden transition-all duration-500 ease-in-out',
      isHidden ? '' : 'grid-cols-[1fr]',
      className
    )}
    aria-hidden={isHidden}
    inert={isHidden ? true : undefined}
    {...props}
  >
    <div
      style={{
        minWidth: `${minWidth}px`,
      }}
      className={cn(align === 'right' && 'ml-auto')}
    >
      {children}
    </div>
  </div>
);
