import { Button } from '@intlayer/design-system/button';
import type { FC } from 'react';
import type { LibInfo } from './constants';
import { LIB_COLORS } from './constants';
import { LibLogo } from './LibLogo';

export const LibCard: FC<{
  lib: LibInfo;
  isActive: boolean;
  onToggle: () => void;
}> = ({ lib, isActive, onToggle }) => (
  <Button
    label={lib.name}
    type="button"
    color="text"
    size="sm"
    variant="hoverable"
    onClick={onToggle}
    isActive={isActive}
    className="relative min-w-40 shrink-0 overflow-hidden text-left"
  >
    <div className="flex flex-row items-center gap-4 px-3 py-1.5">
      {LIB_COLORS[lib.id] && (
        <div
          className="absolute top-0 left-0 h-full w-[3px] rounded-r-full"
          style={{ backgroundColor: LIB_COLORS[lib.id] }}
        />
      )}

      {/* Logo container */}
      <div className="items-left flex h-5 w-20 min-w-20 shrink-0 justify-center">
        <LibLogo
          id={lib.id}
          className="h-5 w-auto max-w-[120px] rounded-sm object-contain"
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
  </Button>
);
