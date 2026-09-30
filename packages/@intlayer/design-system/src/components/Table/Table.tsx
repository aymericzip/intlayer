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
        'w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-2xl text-start text-sm',
        '[&_thead_tr:first-child_th:first-child]:rounded-ss-2xl',
        '[&_thead_tr:first-child_th:last-child]:rounded-se-2xl',
        '[&_tbody_tr:last-child_td:first-child]:rounded-es-2xl',
        '[&_tbody_tr:last-child_td:last-child]:rounded-ee-2xl',
        'supports-[corner-shape:squircle]:rounded-3xl',
        'supports-[corner-shape:squircle]:[&_thead_tr:first-child_th:first-child]:rounded-ss-3xl',
        'supports-[corner-shape:squircle]:[&_thead_tr:first-child_th:last-child]:rounded-se-3xl',
        'supports-[corner-shape:squircle]:[&_tbody_tr:last-child_td:first-child]:rounded-es-3xl',
        'supports-[corner-shape:squircle]:[&_tbody_tr:last-child_td:last-child]:rounded-ee-3xl',
        isInteractive &&
          '[&_tbody_tr:hover]:bg-neutral/40 [&_tbody_tr]:cursor-pointer [&_tbody_tr]:transition-colors',
        className
      )}
      {...props}
    />
  )
);
