import { cn } from '@intlayer/design-system/utils';
import {
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useRef,
} from 'react';
import { DashboardScrollContext } from './DashboardScrollContext';

type DashboardContentLayoutProps = PropsWithChildren<{
  title: ReactNode;
  className?: string;
}>;

export const DashboardContentLayout: FC<DashboardContentLayoutProps> = ({
  title,
  children,
  className,
}) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  const notifyScroll = useCallback((scrollTop: number) => {
    const el = h1Ref.current;
    if (!el) return;
    const progress = Math.min(scrollTop / 50, 1);
    // Mirror the shrink-title @keyframes: font-size 1.875→1.2rem, padding-top 1.5→0.8rem, padding-bottom 1.5→0.6rem
    el.style.fontSize = `${1.875 - 0.675 * progress}rem`;
    el.style.paddingTop = `${1.5 - 0.7 * progress}rem`;
    el.style.paddingBottom = `${1.5 - 0.9 * progress}rem`;
  }, []);

  return (
    <DashboardScrollContext.Provider value={notifyScroll}>
      <h1
        ref={h1Ref}
        className="sticky top-0 z-30 border-neutral border-b-[0.5px] bg-background p-6 pl-10 text-3xl"
        style={{
          // Fallback CSS scroll-driven animation for pages whose scroll container
          // is the outer overflow-auto (e.g. projects, profile). Inner-scroll pages
          // (dictionary, translate) override these values via notifyScroll() above.
          animationTimeline: 'scroll()',
          animationRange: '0 50px',
          animationName: 'shrink-title',
          animationFillMode: 'both',
          animationTimingFunction: 'linear',
        }}
      >
        {title}
      </h1>
      <div
        className={cn(
          'relative flex min-h-0 w-full flex-1 flex-col',
          className
        )}
      >
        {children}
      </div>
    </DashboardScrollContext.Provider>
  );
};
