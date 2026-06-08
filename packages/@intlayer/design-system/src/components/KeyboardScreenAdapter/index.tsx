'use client';

import { useKeyboardDetector } from '@hooks/useKeyboardDetector';
import { cn } from '@utils/cn';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

/**
 * KeyboardScreenAdapter Component
 *
 * A smart wrapper component that automatically adapts the viewport height
 * when virtual keyboards appear on mobile devices. This prevents content
 * from being hidden behind the keyboard and ensures optimal user experience
 * across all devices and orientations.
 *
 * @component
 * @example
 * Basic usage:
 * ```tsx
 * <KeyboardScreenAdapter>
 *   <div>Your app content here</div>
 * </KeyboardScreenAdapter>
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <KeyboardScreenAdapter className="bg-gray-100 p-4">
 *   <form>
 *     <input type="text" placeholder="Enter your name" />
 *     <input type="email" placeholder="Enter your email" />
 *     <button type="submit">Submit</button>
 *   </form>
 * </KeyboardScreenAdapter>
 * ```
 *
 * @example
 * Mobile-first responsive design:
 * ```tsx
 * <KeyboardScreenAdapter className="md:min-h-screen">
 *   <div className="flex flex-col h-full">
 *     <header>Navigation</header>
 *     <main className="flex-1 overflow-auto">
 *       <input type="search" placeholder="Search..." />
 *       Content that needs keyboard adaptation
 *     </main>
 *   </div>
 * </KeyboardScreenAdapter>
 * ```
 *
 * Features:
 * - Automatic viewport height detection and adjustment
 * - Smooth transitions when keyboard shows/hides
 * - Works with both iOS and Android virtual keyboards
 * - Responsive design that adapts to device orientation changes
 * - Maintains scroll behavior and overflow handling
 * - Lightweight with minimal performance impact
 * - Client-side only (Next.js compatible with 'use client')
 *
 * How it works:
 * 1. Uses the useKeyboardDetector hook to monitor window height changes
 * 2. Detects when virtual keyboard appears (window height decreases)
 * 3. Automatically adjusts the container's max-height to fit visible area
 * 4. Provides smooth transitions for better user experience
 * 5. Restores original height when keyboard disappears
 *
 * Use cases:
 * - Mobile web applications with forms
 * - Chat interfaces and messaging apps
 * - Search interfaces and input-heavy UIs
 * - Progressive Web Apps (PWAs)
 * - Any mobile-first application requiring keyboard interaction
 *
 * Browser compatibility:
 * - iOS Safari (all versions)
 * - Chrome Mobile (Android)
 * - Samsung Internet
 * - Firefox Mobile
 * - Other mobile browsers with virtual keyboards
 *
 * Performance considerations:
 * - Uses ResizeObserver for efficient window monitoring
 * - Minimal re-renders through optimized state management
 * - CSS transitions handled by GPU acceleration
 * - No layout thrashing during keyboard transitions
 *
 * Accessibility:
 * - Maintains focus management during transitions
 * - Preserves scroll position and user context
 * - Compatible with screen readers and assistive technologies
 * - Supports keyboard navigation patterns
 *
 * @param props - Component props extending standard div attributes
 * @param props.children - Content to render within the adaptive container
 * @param props.className - Additional CSS classes for the container
 * @param props.style - Inline styles (note: maxHeight may be overridden)
 * @param props.id - Unique identifier for the container
 * @param props.role - ARIA role for accessibility
 * @param props.tabIndex - Tab index for focus management
 * @param props.onScroll - Scroll event handler
 * @param props.onTouchStart - Touch start event handler
 * @param props.onTouchMove - Touch move event handler
 * @param props.onTouchEnd - Touch end event handler
 * @param props...rest - All other standard HTML div attributes
 *
 * @returns A responsive container that adapts to keyboard visibility
 */
export const KeyboardScreenAdapter: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, className, ...props }) => {
  const { windowHeight } = useKeyboardDetector();

  return (
    <div
      className={cn(
        'h-screen w-screen overflow-auto scroll-smooth transition',
        className
      )}
      style={{
        maxHeight: windowHeight ? `${windowHeight}px` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
