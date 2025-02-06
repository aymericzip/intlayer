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

const DEFAULT_PRESS_DETECT_DURATION = 250;

type ContentSelectorProps = {
  onPress: () => void;
  onClickOutside?: () => void;
  pressDuration?: number;
  isSelecting?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'content'>;

export const ContentSelector: FC<ContentSelectorProps> = ({
  children,
  onPress: onSelect,
  onClickOutside: onUnselect,
  pressDuration = DEFAULT_PRESS_DETECT_DURATION,
  isSelecting: isSelectingProp,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseUp = () => {
    setIsHovered(false);
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
      style={{
        display: 'inline',
        cursor: 'pointer',
        userSelect: 'none',
        borderRadius: '0.375rem',
        outlineWidth: '2px',
        outlineOffset: '4px',
        outlineStyle: 'solid',
        outlineColor:
          isSelectingProp || isSelectingState || isHovered
            ? 'inherit'
            : 'transparent',
        transition: 'all 100ms 50ms ease-in-out',
      }}
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
      onMouseEnter={handleMouseEnter}
      ref={divRef}
      {...props}
    >
      {children}
    </span>
  );
};
