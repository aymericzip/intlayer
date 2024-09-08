import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type Align = 'left' | 'right';

type MaxHeightSmootherProps = HTMLAttributes<HTMLDivElement> & {
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
}: MaxHeightSmootherProps) => (
  <div
    className={cn(
      'relative grid h-full grid-cols-[0fr] overflow-x-hidden overflow-y-hidden transition-all duration-500 ease-in-out',
      isHidden ? '' : 'grid-cols-[1fr]',
      className
    )}
    aria-hidden={isHidden}
    {...props}
  >
    <div
      style={{
        minWidth: `${minWidth}px`,
      }}
      tabIndex={isHidden !== false ? undefined : -1}
      className={cn(align === 'right' && 'ml-auto')}
    >
      {children}
    </div>
  </div>
);
