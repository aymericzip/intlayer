'use client';

import {
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react';

export type ClickOutsideDivProps = PropsWithChildren<{
  /**
   * Callback function called when a click occurs outside the component
   */
  onClickOutSide: () => void;
  /**
   * Whether to listen for Escape key presses
   * @default false
   */
  listenForEscape?: boolean;
  /**
   * Whether the component is disabled (won't trigger onClickOutSide)
   * @default false
   */
  disabled?: boolean;
}> &
  HTMLAttributes<HTMLDivElement>;

export const ClickOutsideDiv: FC<ClickOutsideDivProps> = ({
  children,
  onClickOutSide,
  listenForEscape = false,
  disabled = false,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (disabled) return;

      // If clicking outside of the referenced element, call onClickOutSide
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        onClickOutSide();
      }
    },
    [onClickOutSide, disabled]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled || !listenForEscape) return;

      if (event.key === 'Escape') {
        onClickOutSide();
      }
    },
    [onClickOutSide, disabled, listenForEscape]
  );

  useEffect(() => {
    // Attach the event listeners
    document.addEventListener('mousedown', handleClickOutside, {
      passive: true,
    });

    if (listenForEscape) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Clean up on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (listenForEscape) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [handleClickOutside, handleKeyDown, listenForEscape]);

  return (
    <div
      ref={divRef}
      {...props}
      // Add role for better accessibility when used as a container
      role={props.role || 'region'}
    >
      {children}
    </div>
  );
};
