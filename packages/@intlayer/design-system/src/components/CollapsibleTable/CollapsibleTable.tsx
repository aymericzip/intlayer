'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import { useState, type FC, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

// Container variants using CVA
const collapsibleTableVariants = cva(
  'max-w-full w-full bg-card border rounded-lg overflow-hidden',
  {
    variants: {
      size: {
        sm: 'max-w-lg',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
        full: 'max-w-none w-full',
      },
      variant: {
        default: 'bg-card border-neutral/20',
        dark: 'bg-[#242424] border-[#B5B5B5]',
        ghost: 'bg-transparent border-transparent',
        outlined: 'bg-background border-2 border-primary/20',
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
  'flex justify-between items-center p-3 cursor-pointer transition-colors duration-200',
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
        dashed: 'border-b border-dashed border-neutral/20',
        solid: 'border-b border-solid border-neutral/20',
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
      auto: '',
      fixed: 'table-fixed',
    },
  },
  defaultVariants: {
    spacing: 'md',
    layout: 'auto',
  },
});

export interface CollapsibleTableProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
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
 *
 * Features:
 * - Supports both controlled and uncontrolled modes
 * - Customizable styling with CVA variants (size, variant, spacing)
 * - Multiple className props for granular styling control
 * - Custom column rendering and ordering
 * - Accessible with proper ARIA attributes and keyboard navigation
 * - Responsive design with overflow handling
 * - Empty state customization
 * - Flexible data structure support
 *
 * @example
 * // Basic usage
 * const userData = [
 *   { name: 'John Doe', role: 'Developer', experience: '5 years' },
 *   { name: 'Jane Smith', role: 'Designer', experience: '3 years' },
 * ];
 *
 * <CollapsibleTable
 *   title="Team Members"
 *   data={userData}
 *   defaultExpanded={true}
 * />
 *
 * @example
 * // Advanced usage with custom styling and renderers
 * const projectData = [
 *   { name: 'Project A', status: 'active', priority: 'high' },
 *   { name: 'Project B', status: 'completed', priority: 'medium' },
 * ];
 *
 * const columnRenderers = {
 *   status: (value) => (
 *     <Badge variant={value === 'active' ? 'success' : 'default'}>
 *       {value}
 *     </Badge>
 *   ),
 *   priority: (value) => (
 *     <span className={`font-semibold ${
 *       value === 'high' ? 'text-red-600' :
 *       value === 'medium' ? 'text-yellow-600' : 'text-green-600'
 *     }`}>
 *       {value}
 *     </span>
 *   ),
 * };
 *
 * <CollapsibleTable
 *   title="Project Dashboard"
 *   data={projectData}
 *   variant="dark"
 *   size="lg"
 *   borderStyle="solid"
 *   columnRenderers={columnRenderers}
 *   headerClassName="bg-slate-800 text-white"
 *   tableClassName="bg-slate-900"
 *   onExpandToggle={(expanded) => console.log('Table expanded:', expanded)}
 * />
 *
 * @param title - The text or React node displayed in the table header
 * @param data - Array of objects representing table rows. Keys become column headers, values become cell content
 * @param className - Additional CSS classes for the main container element
 * @param headerClassName - Additional CSS classes for the clickable header section
 * @param contentClassName - Additional CSS classes for the table content wrapper
 * @param tableClassName - Additional CSS classes for the HTML table element
 * @param thClassName - Additional CSS classes for table header cells (th elements)
 * @param tdClassName - Additional CSS classes for table body cells (td elements)
 * @param trClassName - Additional CSS classes for table rows (tr elements)
 * @param defaultExpanded - Initial expansion state when component is uncontrolled (default: false)
 * @param isExpanded - Controls expansion state when component is controlled. When provided, component becomes controlled
 * @param onExpandToggle - Callback function called when expansion state changes. Receives new expanded state as parameter
 * @param toggleIcon - Custom React node to display as toggle icon. Defaults to ChevronRight from lucide-react
 * @param size - Size variant affecting container max-width: 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * @param variant - Visual style variant: 'default' | 'dark' | 'ghost' | 'outlined'
 * @param spacing - Container margin spacing: 'none' | 'sm' | 'md' | 'lg' | 'auto'
 * @param borderStyle - Header border style when expanded: 'none' | 'dashed' | 'solid'
 * @param tableSpacing - Table cell spacing: 'none' | 'sm' | 'md' | 'lg'
 * @param tableLayout - CSS table-layout property: 'auto' | 'fixed'
 * @param columnRenderers - Object mapping column names to custom render functions. Function receives (value, rowData) and returns ReactNode
 * @param disabled - When true, disables click interaction and shows disabled visual state
 * @param aria-label - Accessible label for screen readers describing the table purpose
 * @param contentId - Custom ID for the table content area. Used for aria-controls. Auto-generated if not provided
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
          Object.keys(item).forEach((key) => allKeys.add(key));
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
    <div
      className={cn(
        collapsibleTableVariants({ size, variant, spacing }),
        className
      )}
      aria-label={ariaLabel}
      {...props}
    >
      <div
        onClick={toggleExpanded}
        className={cn(
          headerVariants({
            variant,
            borderStyle: isExpanded ? borderStyle : 'none',
          }),
          headerClassName,
          disabled && 'cursor-not-allowed opacity-50'
        )}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isExpanded}
        aria-controls={generatedContentId}
        aria-disabled={disabled}
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
      </div>

      <MaxHeightSmoother isHidden={!isExpanded}>
        <div
          id={generatedContentId}
          className={cn('p-3 overflow-x-auto', contentClassName)}
          role="region"
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
                      'text-left text-sm font-medium text-text/70 pb-2',
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
                    'bg-neutral/5 hover:bg-neutral/10 transition-colors',
                    trClassName
                  )}
                >
                  {tableColumns.map((column) => (
                    <td
                      key={column}
                      className={cn(
                        'px-3 py-2 text-sm text-text rounded',
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
        </div>
      </MaxHeightSmoother>
    </div>
  );
};
