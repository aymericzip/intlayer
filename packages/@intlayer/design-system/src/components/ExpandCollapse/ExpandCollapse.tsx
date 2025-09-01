'use client';

import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { cn } from '../../utils/cn';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

export type ExpandCollapseProps = {
  isRollable?: boolean;
  minHeight?: number;
  children: ReactNode;
  className?: string;
};

const DEFAULT_MIN_HEIGHT = 700;

export const ExpandCollapse: FC<ExpandCollapseProps> = ({
  isRollable = true,
  minHeight = DEFAULT_MIN_HEIGHT,
  children,
  className,
}) => {
  const [codeContainerHeight, setCodeContainerHeight] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const { expandCollapseContent } = useIntlayer('expand-collapse');

  const isTooBig = codeContainerHeight > minHeight;

  useEffect(() => {
    if (codeContainerRef.current) {
      setCodeContainerHeight(codeContainerRef.current.clientHeight);
    }
  }, []);

  if (!isRollable) {
    return children;
  }

  if (!isTooBig) {
    return (
      <div className={cn('grid w-full', className)} ref={codeContainerRef}>
        {children}
      </div>
    );
  }

  return (
    <MaxHeightSmoother
      isHidden={isCollapsed}
      minHeight={minHeight}
      className="w-full overflow-x-scroll overflow-y-hidden"
    >
      <div className={cn('grid w-full', className)} ref={codeContainerRef}>
        {children}
      </div>
      <button
        className={cn(
          'absolute bottom-0 right-0 flex justify-center cursor-pointer w-full px-3 py-0.5 hover:py-1 transition-all duration-300 text-md text-neutral-700 dark:text-neutral-400 items-center shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur rounded-t-2xl bg-gradient-to-t from-card/80 to-transparent',
          !isCollapsed && 'w-auto'
        )}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        {expandCollapseContent(isCollapsed)}
      </button>
    </MaxHeightSmoother>
  );
};
