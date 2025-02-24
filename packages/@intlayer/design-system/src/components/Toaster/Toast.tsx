'use client';

import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { type FC, type ComponentProps, type ReactElement } from 'react';
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

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md p-4 pr-6 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        error: 'bg-error/40 text-text',
        success: 'bg-success/30 text-text',
        default: 'bg-card/80 text-text',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

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
const ToastTitle: FC<ComponentProps<typeof ToastPrimitives.Title>> = ({
  className,
  ...props
}) => (
  <ToastPrimitives.Title
    className={cn('text-sm font-semibold [&+div]:text-xs', className)}
    {...props}
  />
);

const ToastDescription: FC<
  ComponentProps<typeof ToastPrimitives.Description>
> = ({ className, ...props }) => (
  <ToastPrimitives.Description
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
);
type ToastProps = ComponentProps<typeof Toast>;

type ToastActionElement = ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
