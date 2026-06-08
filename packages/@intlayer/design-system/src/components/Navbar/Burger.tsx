import { cn } from '@utils/cn';
import type { HTMLAttributes } from 'react';

/**
 * Props for the Burger menu component
 */
interface BurgerProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the burger menu is in active/open state */
  isActive?: boolean;
}

/**
 * Shared styles for burger menu lines
 * Creates the classic hamburger menu appearance with smooth transitions
 */
const lineStyle =
  'bg-text  absolute top-1/2 block h-[2px] w-8 transition duration-300';

/**
 * Burger Menu Component
 *
 * An animated hamburger menu icon that transforms between closed and open states.
 * Commonly used in mobile navigation to toggle menu visibility.
 *
 * Features:
 * - Smooth CSS transitions between states (300ms duration)
 * - Accessible with proper ARIA attributes
 * - Screen reader support with descriptive labels
 * - Role-based interaction (switch role for toggle behavior)
 * - Responsive sizing (40px × 40px clickable area)
 * - Classic three-line hamburger design
 *
 * Animation States:
 * - Closed: Three horizontal parallel lines
 * - Open: Top and bottom lines rotate to form an X, middle line fades out
 *
 * Accessibility Features:
 * - `role="switch"` indicates toggle behavior
 * - `aria-expanded` reflects current menu state
 * - `aria-checked` provides current selection state
 * - `aria-controls` links to controlled menu element
 * - Dynamic `aria-label` describes current action
 *
 * @example
 * Basic usage:
 * ```tsx
 * const [isMenuOpen, setIsMenuOpen] = useState(false);
 *
 * <Burger
 *   isActive={isMenuOpen}
 *   onClick={() => setIsMenuOpen(!isMenuOpen)}
 * />
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <Burger
 *   isActive={isMenuOpen}
 *   onClick={toggleMenu}
 *   className="lg:hidden"
 *   style={{ zIndex: 1000 }}
 * />
 * ```
 *
 * @param props - Burger component props
 * @returns Animated burger menu JSX element
 */
export const Burger = ({
  isActive = false,
  className,
  ...props
}: BurgerProps) => (
  <div
    className={cn('relative mr-3 size-10 cursor-pointer', className)}
    aria-checked={isActive}
    aria-expanded={isActive}
    aria-controls="mobile-menu"
    role="switch"
    aria-label={isActive ? 'Close menu' : 'Open menu'}
    {...props}
  >
    <div>
      <div
        className={cn(lineStyle, isActive ? 'rotate-[-45deg]' : 'rotate-0')}
      />
      <div
        className={cn(
          lineStyle,
          isActive ? '-translate-y-3 opacity-0' : '-translate-y-2 opacity-100'
        )}
      />
    </div>

    <div>
      <div className={cn(lineStyle, isActive ? 'opacity-0' : 'opacity-100')} />
    </div>

    <div>
      <div
        className={cn(lineStyle, isActive ? 'rotate-[45deg]' : 'rotate-0')}
      />
      <div
        className={cn(
          lineStyle,
          isActive ? 'translate-y-3 opacity-0' : 'translate-y-2 opacity-100'
        )}
      />
    </div>
  </div>
);
