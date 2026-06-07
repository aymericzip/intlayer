import { buttonVariants } from '@intlayer/design-system/button';
import { Checkbox } from '@intlayer/design-system/input';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import type { LibInfo } from './constants';
import { getLibColors } from './constants';
import { LibLogo } from './LibLogo';

export const LibCard: FC<{
  lib: LibInfo;
  isActive: boolean;
  onToggle: () => void;
}> = ({ lib, isActive, onToggle }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const colors = getLibColors(isDarkMode);

  return (
    <label
      htmlFor={lib.id}
      aria-label={lib.name}
      aria-current={isActive ? 'page' : undefined}
      className={buttonVariants({
        color: 'text',
        size: 'sm',
        variant: 'hoverable',
        className:
          'relative h-12 min-w-32 shrink-0 cursor-pointer overflow-hidden text-left',
      })}
    >
      <div className="flex flex-row items-center gap-4 px-3 py-1.5">
        <Checkbox
          id={lib.id}
          name={lib.id}
          checked={isActive}
          onChange={onToggle}
          size="sm"
          color="neutral"
        />
        {colors[lib.id] && (
          <div
            className="absolute top-0 left-0 h-full w-0.75 rounded-r-full"
            style={{ backgroundColor: colors[lib.id] }}
          />
        )}

        {/* Logo container */}
        <div className="items-left flex h-5 w-20 min-w-20 shrink-0 justify-center">
          <LibLogo
            id={lib.id}
            className="h-5 w-auto max-w-30 rounded-sm object-contain"
          />
        </div>

        {/* Text container */}
        <div className="flex flex-col items-start justify-center gap-2 overflow-hidden text-left">
          <span className="truncate font-semibold text-xs leading-tight">
            {lib.name}
          </span>
          {lib.version && (
            <span className="text-[9px] text-neutral leading-none">
              v{lib.version}
            </span>
          )}
        </div>
      </div>
    </label>
  );
};
