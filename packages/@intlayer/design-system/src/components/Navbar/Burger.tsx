import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface BurgerProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

const lineStyle =
  'bg-text  absolute top-1/2 block h-[2px] w-8 transition duration-300';

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
