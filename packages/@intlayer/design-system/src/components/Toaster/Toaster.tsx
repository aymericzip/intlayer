'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';
import { useToast } from './useToast';

/**
 * Toast notification provider component that renders active toast notifications.
 *
 * This component serves as the visual layer for the toast system, rendering all
 * active toasts and handling their animations and positioning. It should be placed
 * at a high level in your component tree to ensure toasts appear above other content.
 *
 * ## Features
 * - **Global Toast Rendering**: Renders all toasts from the global state
 * - **Automatic Positioning**: Uses Radix UI positioning system
 * - **Animation Integration**: Handles enter/exit animations for toasts
 * - **Accessibility**: Provides proper ARIA landmarks and focus management
 * - **Portal Rendering**: Renders toasts in a portal for z-index safety
 *
 * ## Positioning
 * Toasts are positioned at the bottom-right of the viewport by default.
 * This can be customized through the ToastViewport component styling.
 *
 * ## Integration
 * Place this component near the root of your application, typically:
 * - Next.js: In _app.tsx or layout.tsx
 * - React: In your main App component
 * - Ensure it's outside any containers that might clip overflow
 *
 * ## Usage Example
 * Place Toaster component at the root level of your application to ensure
 * toast notifications appear above all other content. Components throughout
 * your app can then use the useToast hook to display notifications.
 *
 * ## Styling Notes
 * - Toasts use fixed positioning to appear above all other content
 * - The viewport is styled for bottom-right positioning by default
 * - Animations are handled automatically through Radix UI primitives
 * - Custom positioning can be achieved by styling the ToastViewport
 *
 * ## Performance
 * - Only active toasts are rendered (dismissed toasts are cleaned up)
 * - Animations are hardware-accelerated where possible
 * - Memory usage is minimal due to automatic cleanup
 *
 * @returns JSX element rendering the toast viewport and active toasts
 */
export const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider.Provider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider.Provider>
  );
};
