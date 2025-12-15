'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import {
  type ComponentProps,
  type FC,
  type HTMLAttributes,
  type RefObject,
  useEffect,
  useRef,
} from 'react';
import { useItemSelector } from '../../hooks';
import { cn } from '../../utils/cn';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';

export const paginationVariants = cva(
  'flex items-center justify-center gap-1',
  {
    variants: {
      size: {
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-3',
      },
      color: {
        text: 'background-text',
        primary: 'background-primary',
        secondary: 'background-secondary',
        neutral: 'background-neutral',
        destructive: 'background-destructive',
      },
      variant: {
        default: '',
        bordered: 'rounded-lg border border-border p-2',
        ghost: 'bg-transparent',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export enum PaginationSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export enum PaginationVariant {
  DEFAULT = 'default',
  BORDERED = 'bordered',
  GHOST = 'ghost',
}

export type PaginationProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof paginationVariants> & {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showFirstLast?: boolean;
    showPrevNext?: boolean;
    maxVisiblePages?: number;
    disabled?: boolean;
  };

const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number
): (number | 'ellipsis')[] => {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];
  const halfVisible = Math.floor(maxVisiblePages / 2);

  pages.push(1);

  if (currentPage <= halfVisible + 2) {
    for (let i = 2; i <= Math.min(maxVisiblePages - 1, totalPages - 1); i++) {
      pages.push(i);
    }
    if (totalPages > maxVisiblePages) {
      pages.push('ellipsis');
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }
  } else if (currentPage >= totalPages - halfVisible - 1) {
    if (totalPages > maxVisiblePages) {
      pages.push('ellipsis');
    }
    for (
      let i = Math.max(2, totalPages - maxVisiblePages + 2);
      i <= totalPages;
      i++
    ) {
      pages.push(i);
    }
  } else {
    pages.push('ellipsis');
    const start = currentPage - halfVisible;
    const end = currentPage + halfVisible;
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    pages.push('ellipsis');
    pages.push(totalPages);
  }

  return pages;
};

const selector = (option: HTMLElement) =>
  option?.getAttribute('aria-current') === 'true';

const getButtonSize = (size?: PaginationSize | `${PaginationSize}` | null) => {
  if (size === PaginationSize.SM) {
    return ButtonSize.ICON_SM;
  } else if (size === PaginationSize.LG) {
    return ButtonSize.ICON_LG;
  } else {
    return ButtonSize.ICON_MD;
  }
};

const InputIndicator: FC<ComponentProps<'div'>> = (props) => (
  <div
    className="absolute top-0 z-0 h-full w-auto rounded-xl bg-text/20 ring-4 ring-text/10 transition-[left,width] duration-300 ease-in-out [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl motion-reduce:transition-none"
    {...props}
  />
);

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = false,
  showPrevNext = true,
  maxVisiblePages = 5,
  disabled = false,
  size = PaginationSize.MD,
  variant = PaginationVariant.DEFAULT,
  color = ButtonColor.TEXT,
  className,
  ...props
}) => {
  const pageNumbers = generatePageNumbers(
    currentPage,
    totalPages,
    maxVisiblePages
  );

  const buttonSize = getButtonSize(size);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const optionsRefs = useRef<HTMLElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { choiceIndicatorPosition, calculatePosition } = useItemSelector(
    optionsRefs,
    {
      selector,
      isHoverable: true,
    }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      calculatePosition();
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, calculatePosition]);

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (!disabled && page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={cn(paginationVariants({ size, variant }), className)}
      {...props}
    >
      <div className="relative flex items-center gap-1">
        {choiceIndicatorPosition && (
          <InputIndicator style={choiceIndicatorPosition} ref={indicatorRef} />
        )}

        {showPrevNext && (
          <Button
            variant={ButtonVariant.OUTLINE}
            size={buttonSize}
            color={ButtonColor.TEXT}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={disabled || isFirstPage}
            label="Go to previous page"
            Icon={ChevronLeft}
            ref={(el) => {
              if (el) optionsRefs.current[0] = el;
            }}
            className="min-w-0 px-2"
          />
        )}

        <div className="flex items-center gap-1 max-md:gap-0.5">
          {pageNumbers.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <div
                  key={`ellipsis-${page}-${index}`}
                  className="flex h-8 min-w-8 items-center justify-center px-1"
                >
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
              );
            }

            const isActive = page === currentPage;
            // Calculate ref index: offset by 1 if showPrevNext, then count only non-ellipsis items
            const refIndex =
              (showPrevNext ? 1 : 0) +
              pageNumbers.slice(0, index).filter((p) => p !== 'ellipsis')
                .length;

            return (
              <Button
                key={page}
                variant={
                  isActive ? ButtonVariant.DEFAULT : ButtonVariant.OUTLINE
                }
                size={buttonSize}
                color={ButtonColor.TEXT}
                onClick={() => handlePageChange(page)}
                disabled={disabled}
                label={`Go to page ${page}`}
                aria-current={isActive ? 'true' : 'false'}
                ref={(el) => {
                  if (el) optionsRefs.current[refIndex] = el;
                }}
                className={cn(
                  'flex aspect-square h-8 w-8 min-w-0 items-center justify-center p-0 text-sm',
                  size === 'sm' && 'h-6 w-6 text-xs',
                  size === 'lg' && 'h-10 w-10 text-base',
                  isActive && 'font-semibold'
                )}
              >
                {page}
              </Button>
            );
          })}
        </div>

        {showPrevNext && (
          <Button
            variant={ButtonVariant.OUTLINE}
            size={buttonSize}
            color={ButtonColor.TEXT}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={disabled || isLastPage}
            label="Go to next page"
            Icon={ChevronRight}
            ref={(el) => {
              const lastRefIndex =
                (showPrevNext ? 1 : 0) +
                pageNumbers.filter((p) => p !== 'ellipsis').length;
              if (el) optionsRefs.current[lastRefIndex] = el;
            }}
            className="min-w-0 px-2"
          />
        )}
      </div>
    </div>
  );
};
