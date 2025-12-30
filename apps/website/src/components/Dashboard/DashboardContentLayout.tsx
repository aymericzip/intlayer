import { cn } from '@utils/cn';
import type { FC, PropsWithChildren, ReactNode } from 'react';

type DashboardContentLayoutProps = PropsWithChildren<{
  title: ReactNode;
  className?: string;
}>;

export const DashboardContentLayout: FC<DashboardContentLayoutProps> = ({
  title,
  children,
  className,
}) => (
  <>
    <h1
      className="sticky top-0 z-50 border-neutral border-b-[0.5px] bg-background p-6 pl-10 text-3xl"
      style={{
        // Indicates that the animation follows the page scroll
        animationTimeline: 'scroll()',
        // The animation plays between 0px and 50px of scroll
        animationRange: '0 50px',
        // Animation name (defined in your global CSS or via Tailwind config)
        animationName: 'shrink-title',
        animationFillMode: 'both',
        animationTimingFunction: 'linear',
      }}
    >
      {title}
    </h1>
    <div className={cn('relative flex w-full flex-1 flex-col', className)}>
      {children}
    </div>
  </>
);
