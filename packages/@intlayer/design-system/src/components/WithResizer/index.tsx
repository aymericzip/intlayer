import React, {
  useState,
  useCallback,
  type PropsWithChildren,
  useEffect,
  type FC,
  useRef,
} from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

type WithResizerProps = {
  initialWidth: number;
  maxWidth?: number;
  minWidth?: number;
};

const StyledContainer = styled.div<{ $minWidth?: string; $maxWidth?: string }>(
  ({ $minWidth, $maxWidth }) => [
    $minWidth && tw`${$minWidth}`,
    $maxWidth && tw`${$maxWidth}`,
    tw`relative w-full h-full max-w-[80%] cursor-ew-resize border-r-[2px] border-neutral-200 dark:border-neutral-950 transition`,
    tw`after:content-[""] after:w-2 after:h-10 after:right-0 after:top-1/2 after:transform after:-translate-y-1/2 after:translate-x-1/2 after:block after:absolute after:bg-neutral-200 after:dark:bg-neutral-950 after:rounded-full after:cursor-ew-resize after:transition`,
    tw`active:border-neutral-400 dark:active:border-neutral-600 after:active:bg-neutral-400 dark:after:active:bg-neutral-600`,
  ]
);
const StyledWrapper = tw.div`absolute top-0 left-0 w-full h-full overflow-hidden cursor-default`;

export const WithResizer: FC<PropsWithChildren<WithResizerProps>> = ({
  initialWidth,
  maxWidth,
  minWidth = 0,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(initialWidth);
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
        const { left: containerLeft } = container.getBoundingClientRect();

        let clientX = 0;
        if (mouseMoveEvent instanceof MouseEvent) {
          clientX = mouseMoveEvent.clientX;
        } else if (mouseMoveEvent instanceof TouchEvent) {
          clientX = mouseMoveEvent.touches[0].clientX;
        }

        const newWidth = clientX - containerLeft;
        const correctedWidth = Math.max(newWidth, 0);

        setWidth(correctedWidth);
      }
    },
    [isResizing]
  );

  // Add event listeners for mouse move and mouse up
  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    window.addEventListener('touchmove', resize);
    window.addEventListener('touchend', stopResizing);

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
      window.removeEventListener('touchmove', resize);
      window.removeEventListener('touchend', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <StyledContainer
      style={{
        width: `${width}px`,
      }}
      $maxWidth={`max-w-[${maxWidth}px]`}
      $minWidth={`min-w-[${minWidth}px]`}
      ref={containerRef}
      onMouseDown={startResizing}
      onTouchStart={startResizing}
      role="slider"
      aria-valuemin={minWidth}
      aria-valuemax={maxWidth}
      aria-valuenow={width}
      aria-label="Resizable component"
    >
      <StyledWrapper
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {children}
      </StyledWrapper>
    </StyledContainer>
  );
};
