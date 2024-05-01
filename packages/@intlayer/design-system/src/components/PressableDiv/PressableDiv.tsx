'use client';

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type FC,
  type MouseEventHandler,
  type HTMLAttributes,
} from 'react';
import tw from 'twin.macro';

const DEFAULT_PRESS_DETECT_DURATION = 400;

type PressableDivProps = {
  onPress: () => void;
  onClickOutside?: () => void;
  pressDuration?: number;
} & HTMLAttributes<HTMLDivElement>;

const StyledContentSelector = tw.div`inline cursor-pointer outline outline-offset-4 outline-2 outline-transparent outline-white/[0]	hover:outline-white/[1] rounded-md transition-all duration-200 delay-100`;

export const PressableDiv: FC<PressableDivProps> = ({
  children,
  onPress: onSelect,
  onClickOutside: onUnselect,
  pressDuration = DEFAULT_PRESS_DETECT_DURATION,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOnLongPress = () => {
    setIsSelecting(true);
    onSelect();
  };

  const startPressTimer = () => {
    pressTimerRef.current = setTimeout(() => {
      handleOnLongPress();
    }, pressDuration);
  };

  const clearPressTimer = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const handleMouseDown = () => {
    clearPressTimer(); // Ensure any previous timer is cleared
    startPressTimer();
  };

  const handleMouseUp = () => {
    clearPressTimer();
  };

  // Use useCallback to ensure the function identity remains stable
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsSelecting(false);
        onUnselect?.();
      }
    },
    [onUnselect]
  );

  useEffect(() => {
    // Attach click outside listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup
      document.removeEventListener('mousedown', handleClickOutside);
      // clearPressTimer(); // Ensure to clear the timer when component unmounts
    };
  }, [handleClickOutside]);

  const handleOnClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isSelecting) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleOnBlur = () => {
    // Stop editing when the element loses focus
    setIsSelecting(false);
  };

  return (
    <StyledContentSelector
      role="button"
      tabIndex={0}
      onKeyUp={() => null}
      onClick={handleOnClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      onBlur={handleOnBlur}
      ref={divRef}
      {...props}
    >
      {children}
    </StyledContentSelector>
  );
};
