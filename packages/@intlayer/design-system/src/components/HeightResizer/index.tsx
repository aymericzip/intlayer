'use client';

import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { cn } from '../../utils/cn';

type HeightResizerProps = {
  initialHeight: number;
  maxHeight?: number;
  minHeight?: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const HeightResizer: FC<PropsWithChildren<HeightResizerProps>> = ({
  initialHeight,
  maxHeight,
  minHeight = 0,
  children,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(initialHeight);
  const [isResizing, setIsResizing] = useState(false);

  // Handler to start resizing
  const startResizing = useCallback(
    (
      mouseDownEvent:
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>
    ) => {
      setIsResizing(true);
      mouseDownEvent.preventDefault();
    },
    []
  );

  // Handler to stop resizing
  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Handler to resize the div
  const resize = useCallback(
    (mouseMoveEvent: MouseEvent | TouchEvent) => {
      const container = containerRef.current;
      if (isResizing && container && parent) {
        const { height: containerHeight, top: containerTop } =
          container.getBoundingClientRect();

        let clientY = 0;
        if (mouseMoveEvent instanceof MouseEvent) {
          clientY = mouseMoveEvent.clientY;
        } else if (mouseMoveEvent instanceof TouchEvent) {
          clientY = mouseMoveEvent.touches[0].clientY;
        }

        const resizeDifference = clientY - containerTop;
        const newHeight = containerHeight - resizeDifference;
        const correctedHeight = Math.max(newHeight, 0);

        setHeight(correctedHeight);
      }
    },
    [isResizing]
  );

  // Add event listeners for mouse move and mouse up
  useEffect(() => {
    window.addEventListener('mousemove', resize, { passive: true });
    window.addEventListener('mouseup', stopResizing);
    window.addEventListener('touchmove', resize, { passive: true });
    window.addEventListener('touchend', stopResizing);

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
      window.removeEventListener('touchmove', resize);
      window.removeEventListener('touchend', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      className={cn(
        minHeight && `max-w-[${maxHeight}px]`,
        maxHeight && `min-w-[${minHeight}px]`,
        'relative h-full w-full max-h-[80%] cursor-ns-resize border-t-[2px] border-neutral-200 transition dark:border-neutral-950',
        'before:absolute before:top-0 before:z-10 before:left-1/2 before:block before:w-10 before:h-2 before:-translate-y-1/2 before:-translate-x-1/2 before:transform before:cursor-ns-resize before:rounded-full before:bg-neutral-200 before:transition before:content-[""] dark:before:bg-neutral-950',
        'active:border-neutral-400 active:before:bg-neutral-400 dark:active:border-neutral-600 active:dark:before:bg-neutral-600',
        className
      )}
      style={{
        height: `${height}px`,
      }}
      ref={containerRef}
      onMouseDown={startResizing}
      onTouchStart={startResizing}
      aria-valuemin={minHeight}
      aria-valuemax={maxHeight}
      aria-valuenow={height}
      aria-label="Resizable component"
      role="slider"
      tabIndex={0}
      {...props}
    >
      <div
        className="absolute left-0 top-0 size-full cursor-default overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
