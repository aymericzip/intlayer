import { cn } from '@intlayer/design-system/utils';
import type { FC } from 'react';

type NavListSkeletonProps = {
  /** Number of placeholder rows to render. */
  rows?: number;
};

/**
 * Lightweight placeholder for the documentation / blog navigation sidebar.
 *
 * Rendered as the `<Await>` fallback while the navigation tree is streamed in
 * (via `defer`) so the main article can paint immediately without causing a
 * layout shift once the real navigation resolves.
 */
export const NavListSkeleton: FC<NavListSkeletonProps> = ({ rows = 8 }) => (
  <nav
    aria-hidden
    className="m-auto flex min-w-40 max-w-80 flex-col gap-4 px-5 pt-12 pb-20"
  >
    {Array.from({ length: rows }).map((_, index) => (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder rows
        key={index}
        className={cn(
          'h-4 animate-pulse rounded-md bg-neutral/20',
          index % 3 === 0 ? 'w-3/4' : 'w-1/2'
        )}
      />
    ))}
  </nav>
);
