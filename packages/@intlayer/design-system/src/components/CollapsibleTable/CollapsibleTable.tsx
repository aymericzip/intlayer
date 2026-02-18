'use client';

import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import { type FC, type HTMLAttributes, type ReactNode, useState } from 'react';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

// Container variants using CVA
const collapsibleTableVariants = cva(
  'w-full max-w-full overflow-hidden rounded-lg border bg-card',
  {
    variants: {
      size: {
        sm: 'max-w-lg',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
        full: 'w-full max-w-none',
      },
      variant: {
        default: 'border-neutral/20 bg-card',
        dark: 'border-[#B5B5B5] bg-[#242424]',
        ghost: 'border-transparent bg-transparent',
        outlined: 'border-2 border-primary/20 bg-background',
      },
      spacing: {
        none: '',
        sm: 'm-2',
        md: 'm-4',
        lg: 'm-6',
        auto: 'm-auto',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      spacing: 'auto',
    },
  }
);

// Header variants
const headerVariants = cva(
  'flex w-full cursor-pointer items-center justify-between p-3 transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'hover:bg-neutral/5',
        dark: 'hover:bg-neutral/10',
        ghost: 'hover:bg-primary/5',
        outlined: 'hover:bg-primary/5',
      },
      borderStyle: {
        none: '',
        dashed: 'border-neutral/20 border-b border-dashed',
        solid: 'border-neutral/20 border-b border-solid',
      },
    },
    defaultVariants: {
      variant: 'default',
      borderStyle: 'dashed',
    },
  }
);

// Table variants
const tableVariants = cva('w-full border-collapse', {
  variants: {
    spacing: {
      none: 'border-spacing-0',
      sm: 'border-spacing-1',
      md: 'border-spacing-2',
      lg: 'border-spacing-4',
    },
    layout: {
      auto: 'table-auto',
      fixed: 'table-fixed',
    },
  },
  defaultVariants: {
    spacing: 'md',
    layout: 'auto',
  },
});

export interface CollapsibleTableProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof collapsibleTableVariants> {
  /** Table title displayed in the header */
  title: string;
  /** Array of data objects to display in the table */
  data: Record<string, unknown>[];
  /** Custom class for the main container */
  className?: string;
  /** Custom class for the header section */
  headerClassName?: string;
  /** Custom class for the content wrapper */
  contentClassName?: string;
  /** Custom class for the table element */
  tableClassName?: string;
  /** Custom class for table header cells */
  thClassName?: string;
  /** Custom class for table body cells */
  tdClassName?: string;
  /** Custom class for table rows */
  trClassName?: string;
  /** Controls if the table is expanded by default */
  defaultExpanded?: boolean;
  /** Controlled expansion state */
  isExpanded?: boolean;
  /** Callback when expansion state changes */
  onExpandToggle?: (expanded: boolean) => void;
  /** Custom icon for the toggle (defaults to ChevronRight) */
  toggleIcon?: ReactNode;
  /** Header border style variant */
  borderStyle?: 'none' | 'dashed' | 'solid';
  /** Table spacing variant */
  tableSpacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Table layout variant */
  tableLayout?: 'auto' | 'fixed';
  /** Custom column renderers */
  columnRenderers?: Record<
    string,
    (value: unknown, row: Record<string, unknown>) => ReactNode
  >;
  /** Disable the collapse functionality */
  disabled?: boolean;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** ID for the table content (for aria-controls) */
  contentId?: string;
}

/**
 * CollapsibleTable component that displays tabular data in an expandable/collapsible format.
 * It provides a clickable header that controls the visibility of the table content with smooth animations.
 */
export const CollapsibleTable: FC<CollapsibleTableProps> = ({
  title,
  data,
  className,
  headerClassName,
  contentClassName,
  tableClassName,
  thClassName,
  tdClassName,
  trClassName,
  defaultExpanded = false,
  isExpanded: controlledExpanded,
  onExpandToggle,
  toggleIcon,
  size,
  variant,
  spacing,
  borderStyle,
  tableSpacing,
  tableLayout,
  columnRenderers,
  disabled = false,
  'aria-label': ariaLabel,
  contentId,
  ...props
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isExpanded = controlledExpanded ?? internalExpanded;

  const toggleExpanded = () => {
    if (disabled) return;
    const newState = !isExpanded;
    if (onExpandToggle) onExpandToggle(newState);
    else setInternalExpanded(newState);
  };

  const getColumns = (data: Record<string, unknown>[]) => {
    if (Array.isArray(data) && data.length > 0) {
      const allKeys = new Set<string>();
      data.forEach((item) => {
        if (item && typeof item === 'object') {
          Object.keys(item).forEach((key) => {
            allKeys.add(key);
          });
        }
      });
      return Array.from(allKeys);
    }
    return [];
  };

  const tableColumns = getColumns(data);
  const generatedContentId =
    contentId || `collapsible-table-${Math.random().toString(36).substr(2, 9)}`;

  const renderCellContent = (
    column: string,
    value: unknown,
    row: Record<string, unknown>
  ) => {
    if (columnRenderers?.[column]) {
      return columnRenderers[column](value, row);
    }
    return String(value ?? '—');
  };

  return (
    <section
      className={cn(
        collapsibleTableVariants({ size, variant, spacing }),
        className
      )}
      aria-label={ariaLabel}
      {...props}
    >
      <button
        id={`${generatedContentId}-header`}
        type="button"
        onClick={toggleExpanded}
        disabled={disabled}
        className={cn(
          headerVariants({
            variant,
            borderStyle: isExpanded ? borderStyle : 'none',
          }),
          headerClassName,
          disabled && 'cursor-not-allowed opacity-50'
        )}
        aria-expanded={isExpanded}
        aria-controls={generatedContentId}
      >
        <p className="font-semibold">{title}</p>
        <div
          className={cn(
            'transition-transform duration-200',
            isExpanded && 'rotate-90',
            disabled && 'opacity-50'
          )}
        >
          {toggleIcon ?? <ChevronRight size={16} />}
        </div>
      </button>

      <MaxHeightSmoother isHidden={!isExpanded}>
        <section
          id={generatedContentId}
          className={cn('overflow-x-auto p-3', contentClassName)}
          aria-labelledby={`${generatedContentId}-header`}
        >
          <table
            className={cn(
              tableVariants({ spacing: tableSpacing, layout: tableLayout }),
              'border-separate',
              tableClassName
            )}
          >
            <thead>
              <tr className={trClassName}>
                {tableColumns.map((column) => (
                  <th
                    key={column}
                    className={cn(
                      'pb-2 text-left font-medium text-sm text-text/70',
                      thClassName
                    )}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={cn(
                    'bg-neutral/5 transition-colors hover:bg-neutral/10',
                    trClassName
                  )}
                >
                  {tableColumns.map((column) => (
                    <td
                      key={column}
                      className={cn(
                        'rounded px-3 py-2 text-sm text-text',
                        tdClassName
                      )}
                    >
                      {renderCellContent(column, row[column], row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </MaxHeightSmoother>
    </section>
  );
};
