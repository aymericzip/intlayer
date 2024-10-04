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
import { cn } from '../../utils/cn';

const DEFAULT_PRESS_DETECT_DURATION = 400;

type PressableDivProps = {
  onPress: () => void;
  onClickOutside?: () => void;
  pressDuration?: number;
  isSelecting?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const PressableSpan: FC<PressableDivProps> = ({
  children,
  onPress: onSelect,
  onClickOutside: onUnselect,
  pressDuration = DEFAULT_PRESS_DETECT_DURATION,
  isSelecting: isSelectingProp,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isSelectingState, setIsSelectingState] = useState(isSelectingProp);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOnLongPress = () => {
    setIsSelectingState(true);
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
        setIsSelectingState(false);
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
    if (isSelectingState) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleOnBlur = () => {
    // Stop editing when the element loses focus
    setIsSelectingState(false);
  };

  return (
    <span
      className={cn(
        'inline cursor-pointer select-none rounded-md outline outline-2 outline-offset-4 outline-transparent transition-all delay-100 duration-200',
        (isSelectingProp ?? isSelectingState)
          ? 'outline-inherit'
          : 'hover:outline-inherit'
      )}
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
    </span>
  );
};
