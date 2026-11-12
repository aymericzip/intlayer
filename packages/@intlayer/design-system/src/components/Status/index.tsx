import { useTheme } from '@providers/ThemeProvider';
import cn from 'cnfast';
import type { FC } from 'react';

/**
 * Status page badge, themed to match the page.
 *
 * The `src` waits for the resolved theme (unknown during SSR): starting from
 * `theme=undefined` and swapping it after hydration loaded the badge twice.
 */
export const Status: FC<{ className?: string }> = ({ className, ...props }) => {
  const { resolvedTheme } = useTheme();
  return (
    <div
      {...props}
      className={cn('w-full max-w-[200px] overflow-hidden rounded', className)}
    >
      <iframe
        title="Badge"
        src={
          resolvedTheme
            ? `https://status.intlayer.org/badge?theme=${resolvedTheme}`
            : undefined
        }
        loading="lazy"
        height="30"
        style={{
          width: '100%',
          colorScheme: 'light',
        }}
      />
    </div>
  );
};
