import {
  type Component,
  createEffect,
  createSignal,
  type JSX,
  onCleanup,
} from 'solid-js';

const DEFAULT_PRESS_DETECT_DURATION = 250;

type ContentSelectorProps = {
  onPress: () => void;
  onHover?: () => void;
  onClickOutside?: () => void;
  pressDuration?: number;
  isSelecting?: boolean;
  children?: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const ContentSelector: Component<ContentSelectorProps> = (props) => {
  let divRef: HTMLDivElement | undefined;
  const [isHovered, setIsHovered] = createSignal(false);
  const [isSelectingState, setIsSelectingState] = createSignal(
    props.isSelecting
  );
  let pressTimerRef: ReturnType<typeof setTimeout> | null = null;

  const isChildrenString = typeof props.children === 'string';

  const handleOnLongPress = () => {
    setIsSelectingState(true);
    props.onPress();
  };

  const startPressTimer = () => {
    pressTimerRef = setTimeout(() => {
      handleOnLongPress();
    }, props.pressDuration ?? DEFAULT_PRESS_DETECT_DURATION);
  };

  const clearPressTimer = () => {
    if (pressTimerRef) {
      clearTimeout(pressTimerRef);
      pressTimerRef = null;
    }
  };

  const handleMouseDown = () => {
    clearPressTimer(); // Ensure any previous timer is cleared
    startPressTimer();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    props.onHover?.();
  };

  const handleMouseUp = () => {
    setIsHovered(false);
    clearPressTimer();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef && !divRef.contains(event.target as Node)) {
      setIsSelectingState(false);
      props.onClickOutside?.();
    }
  };

  createEffect(() => {
    // Attach click outside listener
    document.addEventListener('mousedown', handleClickOutside);

    onCleanup(() => {
      // Cleanup
      document.removeEventListener('mousedown', handleClickOutside);
      clearPressTimer(); // Ensure to clear the timer when component unmounts
    });
  });

  const handleOnClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (e) => {
    if (isSelectingState()) {
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
        display: isChildrenString ? 'inline' : 'inline-block',
        cursor: 'pointer',
        'user-select': 'none',
        'border-radius': '0.375rem',
        'outline-width': '2px',
        'outline-offset': '4px',
        'outline-style': 'solid',
        'outline-color':
          props.isSelecting || isSelectingState() || isHovered()
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
      {...(props as any)}
    >
      {props.children}
    </span>
  );
};
