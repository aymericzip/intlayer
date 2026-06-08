import { cn } from '@utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Enables hover states and cursor changes for interactive rows */
  isInteractive?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, isInteractive, ...props }, ref) => (
    <table
      ref={ref}
      className={cn(
        'w-full table-auto overflow-hidden text-left',
        isInteractive &&
          '[&_tbody_tr:hover]:bg-neutral/40 [&_tbody_tr:hover]:dark:bg-neutral-dark/40 [&_tbody_tr]:cursor-pointer [&_tbody_tr]:transition-colors',
        className
      )}
      {...props}
    />
  )
);
