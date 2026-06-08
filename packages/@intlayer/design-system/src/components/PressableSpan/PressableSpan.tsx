'use client';

import { cn } from '@utils/cn';
import {
  type FC,
  type HTMLAttributes,
  type MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const DEFAULT_PRESS_DETECT_DURATION = 400;

/**
 * Props for the PressableSpan component
 */
type PressableSpanProps = {
  /**
   * Callback function triggered when a long press is detected
   * @example
   * ```tsx
   * <PressableSpan onPress={() => console.log('Long pressed!')}>
   *   Press and hold me
   * </PressableSpan>
   * ```
   */
  onPress: () => void;

  /**
   * Optional callback function triggered when clicking outside the component while it's in selecting state
   * @example
   * ```tsx
   * <PressableSpan
   *   onPress={() => setIsEditing(true)}
   *   onClickOutside={() => setIsEditing(false)}
   * >
   *   Click outside to deselect
   * </PressableSpan>
   * ```
   */
  onClickOutside?: () => void;

  /**
   * Duration in milliseconds for long press detection
   * @default 400
   * @example
   * ```tsx
   * <PressableSpan pressDuration={800} onPress={() => {}}>
   *   Longer press required
   * </PressableSpan>
   * ```
   */
  pressDuration?: number;

  /**
   * External control for the selecting state
   * @example
   * ```tsx
   * <PressableSpan isSelecting={isEditing} onPress={() => {}}>
   *   Externally controlled
   * </PressableSpan>
   * ```
   */
  isSelecting?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

/**
 * PressableSpan - An interactive span element that responds to long press gestures
 *
 * A versatile component that detects long press interactions and provides visual feedback.
 * Commonly used for text editing interfaces, selection systems, and interactive content
 * that requires differentiation between quick clicks and intentional long presses.
 *
 * ## Key Features
 * - **Long Press Detection**: Configurable press duration for different interaction patterns
 * - **Visual Feedback**: Smooth outline transitions to indicate interactive and selected states
 * - **Click Outside Detection**: Automatically deselects when clicking outside the component
 * - **Touch Support**: Works seamlessly on both desktop and mobile devices
 * - **Accessible**: Keyboard navigation support and proper ARIA attributes
 *
 * ## Use Cases
 * - Text editing interfaces where long press activates edit mode
 * - Content selection systems with visual feedback
 * - Interactive cards or elements that need press-and-hold activation
 * - Mobile-friendly interfaces requiring long press gestures
 *
 * ## Accessibility
 * - Uses semantic `role="button"` for proper screen reader announcement
 * - Keyboard navigable with `tabIndex={0}`
 * - Focus management with proper blur handling
 * - Visual outline indicators for focus and selection states
 *
 * @example
 * Basic usage with long press detection:
 * ```tsx
 * <PressableSpan onPress={() => setIsEditing(true)}>
 *   Press and hold to edit this text
 * </PressableSpan>
 * ```
 *
 * @example
 * With custom press duration and click outside handling:
 * ```tsx
 * <PressableSpan
 *   pressDuration={600}
 *   onPress={() => setIsEditing(true)}
 *   onClickOutside={() => setIsEditing(false)}
 *   isSelecting={isEditing}
 * >
 *   Custom behavior configuration
 * </PressableSpan>
 * ```
 *
 * @example
 * In a content editing context:
 * ```tsx
 * <PressableSpan
 *   onPress={() => startEditingContent(contentId)}
 *   onClickOutside={() => saveAndExitEditing()}
 *   className="prose-text"
 * >
 *   {editableContent}
 * </PressableSpan>
 * ```
 */

export const PressableSpan: FC<PressableSpanProps> = ({
  children,
  onPress: onSelect,
  onClickOutside: onUnselect,
  pressDuration = DEFAULT_PRESS_DETECT_DURATION,
  isSelecting: isSelectingProp,
  ...props
}) => {
  const elementRef = useRef<HTMLSpanElement>(null);
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
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
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

  /**
   * Handle keyboard interactions
   * - Enter/Space: Trigger long press action immediately
   * - Escape: Cancel selection/editing state
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleOnLongPress();
        break;
      case 'Escape':
        e.preventDefault();
        setIsSelectingState(false);
        onUnselect?.();
        break;
      default:
        break;
    }
  };

  const isCurrentlySelecting = isSelectingProp ?? isSelectingState;

  return (
    <span
      className={cn(
        'inline cursor-pointer select-none rounded-md outline outline-2 outline-transparent outline-offset-4 transition-all delay-100 duration-200',
        isCurrentlySelecting ? 'outline-inherit' : 'hover:outline-inherit'
      )}
      role="button"
      tabIndex={0}
      aria-pressed={isCurrentlySelecting ? 'true' : 'false'}
      aria-label={`${isCurrentlySelecting ? 'Selected' : 'Selectable'} content`}
      onKeyDown={handleKeyDown}
      onClick={handleOnClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      onBlur={handleOnBlur}
      ref={elementRef}
      {...props}
    >
      {children}
    </span>
  );
};
