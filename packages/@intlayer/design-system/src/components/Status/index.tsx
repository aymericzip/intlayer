import { useTheme } from '@providers/ThemeProvider';
import cn from 'cnfast';
import type { FC } from 'react';

export const Status: FC<{ className?: string }> = ({ className, ...props }) => {
  const { resolvedTheme } = useTheme();
  return (
    <div
      {...props}
      className={cn('w-full max-w-[200px] overflow-hidden rounded', className)}
    >
      <iframe
        title="Badge"
        src={`https://status.intlayer.org/badge?theme=${resolvedTheme}`}
        height="30"
        style={{
          width: '100%',
          colorScheme: 'light',
        }}
      />
    </div>
  );
};
