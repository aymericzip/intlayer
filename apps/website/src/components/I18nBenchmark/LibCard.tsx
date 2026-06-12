import { Button } from '@intlayer/design-system/button';
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
    <Button
      label={lib.name}
      type="button"
      color="text"
      size="sm"
      variant="hoverable"
      onClick={onToggle}
      className="relative h-12 w-full overflow-hidden text-left"
    >
      <div className="flex w-full flex-row items-center gap-2 px-2 py-1.5">
        <input
          type="checkbox"
          name={lib.id}
          checked={isActive}
          onChange={onToggle}
          onClick={(e) => e.stopPropagation()}
          aria-label={lib.name}
          hidden
        />
        {colors[lib.id] && (
          <div className="justify-left flex h-5 w-5 shrink-0 items-center">
            <span
              className="size-2.5 rounded-full"
              style={
                isActive
                  ? {
                      backgroundColor: colors[lib.id],
                    }
                  : { border: 'solid 1px' }
              }
            />
          </div>
        )}

        {/* Logo container */}
        <div className="flex h-5 min-w-0 max-w-12 flex-1 shrink items-center justify-center sm:max-w-16 md:max-w-20">
          <LibLogo
            id={lib.id}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Text container */}
        <div className="flex shrink-0 flex-col items-start justify-center gap-1 text-left">
          <span className="font-semibold text-xs leading-tight">
            {lib.name}
          </span>
          {lib.version && (
            <span className="text-neutral text-xs leading-none">
              v{lib.version}
            </span>
          )}
        </div>
      </div>
    </Button>
  );
};
