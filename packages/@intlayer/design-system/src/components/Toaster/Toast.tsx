'use client';

import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import type { ComponentProps, FC, ReactElement } from 'react';
import { cn } from '../../utils/cn';

const ToastProvider = ToastPrimitives;

const ToastViewport: FC<ComponentProps<typeof ToastPrimitives.Viewport>> = ({
  className,
  ...props
}) => (
  <ToastPrimitives.Viewport
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
);

/**
 * Toast variant styles using class-variance-authority.
 *
 * Defines visual styles for different toast types with semantic colors,
 * animations, and responsive behavior.
 *
 * @example
 * ```tsx
 * // Error toast with red background
 * <Toast variant="error">Error message</Toast>
 *
 * // Success toast with green background
 * <Toast variant="success">Success message</Toast>
 *
 * // Default toast with neutral styling
 * <Toast variant="default">Info message</Toast>
 * ```
 */
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md p-4 pr-6 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      /** Toast visual variants for different message types */
      variant: {
        /** Error state with red styling for failures and warnings */
        error: 'bg-error/40 text-text',
        /** Success state with green styling for confirmations */
        success: 'bg-success/30 text-text',
        /** Default neutral styling for general information */
        default: 'bg-card/80 text-text',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Toast Component
 *
 * A notification component that displays temporary messages to users using Radix UI primitives.
 * Supports different visual variants, animations, and user interactions including swipe-to-dismiss.
 *
 * ## Features
 * - **Visual Variants**: Error, success, and default styling themes
 * - **Animations**: Smooth slide-in/slide-out transitions with fade effects
 * - **Swipe Gestures**: Touch-friendly swipe-to-dismiss functionality
 * - **Accessibility**: Full screen reader support and keyboard navigation
 * - **Positioning**: Smart positioning with responsive viewport handling
 * - **Auto-dismiss**: Configurable automatic dismissal timing
 *
 * ## Technical Implementation
 * - Built on Radix UI Toast primitives for accessibility compliance
 * - Uses Framer Motion for smooth animations and gestures
 * - CVA (class-variance-authority) for consistent styling variants
 * - Backdrop blur effects for modern visual appeal
 * - CSS transforms for hardware-accelerated animations
 *
 * @example
 * ```tsx
 * // Basic toast with title and description
 * <Toast variant="default">
 *   <ToastTitle>Notification</ToastTitle>
 *   <ToastDescription>Your action was completed successfully.</ToastDescription>
 *   <ToastClose />
 * </Toast>
 *
 * // Error toast with action button
 * <Toast variant="error">
 *   <ToastTitle>Upload Failed</ToastTitle>
 *   <ToastDescription>Could not upload file. Please try again.</ToastDescription>
 *   <ToastAction altText="Retry upload">Retry</ToastAction>
 *   <ToastClose />
 * </Toast>
 * ```
 */
const Toast: FC<
  ComponentProps<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
> = ({ className, variant, ...props }) => {
  return (
    <ToastPrimitives.Root
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
};

/**
 * ToastAction Component
 *
 * An interactive button component for toast notifications that allows users to take
 * actions related to the notification message.
 *
 * ## Features
 * - **Accessibility**: Requires `altText` prop for screen readers
 * - **Visual States**: Hover, focus, and disabled state styling
 * - **Theme Integration**: Supports destructive and default themes
 * - **Keyboard Navigation**: Full keyboard accessibility support
 *
 * ## Usage Guidelines
 * - Use for actionable notifications (retry, undo, view details)
 * - Keep action text short and descriptive
 * - Provide meaningful `altText` for accessibility
 * - Limit to one primary action per toast
 *
 * @example
 * ```tsx
 * // Retry action for failed operations
 * <ToastAction altText="Retry the failed operation">
 *   Retry
 * </ToastAction>
 *
 * // Undo action for reversible operations
 * <ToastAction altText="Undo the last action">
 *   Undo
 * </ToastAction>
 *
 * // Navigation action
 * <ToastAction altText="View the uploaded file">
 *   View File
 * </ToastAction>
 * ```
 */
const ToastAction: FC<ComponentProps<typeof ToastPrimitives.Action>> = ({
  className,
  ...props
}) => (
  <ToastPrimitives.Action
    className={cn(
      'hover:bg-text focus:ring-ring group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive focus:outline-hidden inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:ring-1 disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
);

const ToastClose: FC<ComponentProps<typeof ToastPrimitives.Close>> = ({
  className,
  ...props
}) => (
  <ToastPrimitives.Close
    className={cn(
      'text-text/50 hover:text-text/80 focus:outline-hidden absolute right-1 top-1 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="size-5" />
  </ToastPrimitives.Close>
);
/**
 * ToastTitle Component
 *
 * The primary heading text for toast notifications. Provides semantic structure
 * and proper typography hierarchy within the toast.
 *
 * ## Styling Features
 * - Semi-bold font weight for emphasis
 * - Automatic text sizing adjustments for descriptions
 * - Proper spacing relationships with other toast elements
 *
 * @example
 * ```tsx
 * <ToastTitle>File Upload Complete</ToastTitle>
 * <ToastTitle>Error: Connection Failed</ToastTitle>
 * <ToastTitle>Settings Saved</ToastTitle>
 * ```
 */
const ToastTitle: FC<ComponentProps<typeof ToastPrimitives.Title>> = ({
  className,
  ...props
}) => (
  <ToastPrimitives.Title
    className={cn('text-sm font-semibold [&+div]:text-xs', className)}
    {...props}
  />
);

/**
 * ToastDescription Component
 *
 * Supporting text that provides additional context or details for the toast notification.
 * Complements the ToastTitle with more detailed information.
 *
 * ## Styling Features
 * - Slightly reduced opacity for visual hierarchy
 * - Smaller text size than title
 * - Optimal line height for readability
 *
 * ## Content Guidelines
 * - Keep descriptions concise but informative
 * - Provide actionable information when possible
 * - Use plain language for better accessibility
 *
 * @example
 * ```tsx
 * <ToastDescription>
 *   Your document has been uploaded successfully and is now available for sharing.
 * </ToastDescription>
 *
 * <ToastDescription>
 *   Please check your internet connection and try again.
 * </ToastDescription>
 * ```
 */
const ToastDescription: FC<
  ComponentProps<typeof ToastPrimitives.Description>
> = ({ className, ...props }) => (
  <ToastPrimitives.Description
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
);
/**
 * Props type for Toast component including all Radix UI Toast.Root props
 * and variant styling options.
 */
type ToastProps = ComponentProps<typeof Toast>;

/**
 * Type for ToastAction elements used in toast configurations.
 * Ensures type safety when passing action elements to toast functions.
 */
type ToastActionElement = ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
};
