import type { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface MaxHeightSmootherProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHidden?: boolean;
  isOverable?: boolean;
  isFocusable?: boolean;
  minHeight?: number;
}

export const MaxHeightSmoother: FC<MaxHeightSmootherProps> = ({
  children,
  isHidden,
  className = '',
  isOverable = false,
  isFocusable = false,
  minHeight = 0,
  ...props
}) => (
  <div
    aria-hidden={isHidden}
    className={cn(
      'group/height-smoother relative grid w-full grid-rows-[0fr] overflow-hidden transition-all duration-700 ease-in-out',
      typeof isHidden !== 'undefined' &&
        !isHidden &&
        'grid-rows-[1fr] overflow-x-auto',
      isOverable && 'hover:grid-rows-[1fr] hover:overflow-x-auto',
      isFocusable && 'focus:grid-rows-[1fr] focus:overflow-x-auto',
      className
    )}
    {...props}
  >
    <div
      style={{
        minHeight: `${minHeight}px`,
      }}
      className={cn(
        isOverable && 'group-hover/height-smoother:visible',
        isFocusable && 'group-focus/height-smoother:visible',
        className
      )}
    >
      {children}
    </div>
  </div>
);
