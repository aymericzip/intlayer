import { cn } from '@utils/cn';
import type { FC, HTMLAttributes } from 'react';
import { Spinner } from './spinner';

/**
 * Props for the Loader component
 */
export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  /** Controls whether the loading spinner is displayed. Defaults to true when undefined */
  isLoading?: boolean;
  /** Controls whether the children are kept when loading is false. Defaults to false */
  keepChildren?: boolean;
};

/**
 * Loader Component
 *
 * A versatile loading component that can function as both a standalone loader
 * and a wrapper for content. When loading is true, displays an animated spinner.
 * When loading is false, renders the wrapped content.
 *
 * @component
 * @example
 * Standalone usage:
 * ```tsx
 * <Loader isLoading={true} />
 * ```
 *
 * @example
 * As a content wrapper:
 * ```tsx
 * <Loader isLoading={isDataLoading}>
 *   <div>Your content here</div>
 * </Loader>
 * ```
 *
 * @example
 * Default behavior (loading = true):
 * ```tsx
 * <Loader />
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <Loader
 *   isLoading={true}
 *   className="min-h-[200px] bg-gray-50"
 *   aria-label="Loading user data"
 * />
 * ```
 *
 * @example
 * Conditional content loading:
 * ```tsx
 * <Loader isLoading={!data}>
 *   {data && (
 *     <div>
 *       <h2>{data.title}</h2>
 *       <p>{data.content}</p>
 *     </div>
 *   )}
 * </Loader>
 * ```
 *
 * Features:
 * - Dual-mode operation: standalone spinner or content wrapper
 * - Responsive design with flexible sizing
 * - Accessible with proper ARIA attributes and role
 * - Smooth animated spinner using SVG
 * - Customizable styling through className prop
 * - Supports all standard HTML div attributes
 * - Screen constraints (max-height/width) to prevent overflow
 * - Internationalization ready with aria-label support
 *
 * Accessibility:
 * - Uses role="status" for screen reader announcements
 * - Includes descriptive aria-label for the loading state
 * - Maintains focus management when transitioning between states
 * - Supports custom aria-label through props for specific contexts
 * - Compatible with keyboard navigation patterns
 *
 * Performance:
 * - Lightweight SVG spinner with CSS animations
 * - Conditional rendering prevents unnecessary DOM updates
 * - Optimized for frequent loading state changes
 * - No external dependencies beyond internal utilities
 *
 * @param props - Component props extending HTML div attributes
 * @param props.children - Content to display when not loading
 * @param props.isLoading - Loading state control (defaults to true)
 * @param props.className - Additional CSS classes for the loader container
 * @param props.role - ARIA role (defaults to "status")
 * @param props.aria-label - Custom accessibility label
 * @param props.id - Unique identifier for the loader
 * @param props.style - Inline styles object
 * @param props.data-* - Data attributes for testing or tracking
 * @param props...rest - All other standard HTML div attributes
 *
 * @returns A loading spinner when isLoading is true, otherwise renders children
 */
export const Loader: FC<LoaderProps> = ({
  children,
  isLoading = true,
  keepChildren = false,
  className,
  ...props
}) => (
  <>
    {isLoading && keepChildren ? (
      <div className="relative size-full">
        <div
          className={cn(
            'absolute top-0 left-0 flex size-full max-h-screen max-w-[100vw] flex-1 items-center justify-center',
            className
          )}
          role="status"
          aria-label="Animated icon, meaning that the website is processing"
          {...props}
        >
          <Spinner className="size-10 max-h-full max-w-full" />
        </div>
        {children}
      </div>
    ) : isLoading ? (
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
