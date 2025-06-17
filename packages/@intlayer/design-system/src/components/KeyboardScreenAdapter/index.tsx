'use client';

import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { useKeyboardDetector } from '../../hooks/useKeyboardDetector';
import { cn } from '../../utils/cn';

export const KeyboardScreenAdapter: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, className, ...props }) => {
  const { windowHeight } = useKeyboardDetector();

  return (
    <div
      className={cn(
        'h-screen w-screen overflow-auto scroll-smooth transition',
        className
      )}
      style={{
        maxHeight: windowHeight ? `${windowHeight}px` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
