'use client';

import { getConfiguration } from '@intlayer/config/client';
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type FC,
  type MouseEventHandler,
} from 'react';
import type { KeyPath } from '../server/types';

const PRESS_DETECT_DURATION = 500;

const editContent = async (
  dictionaryPath: string,
  keyPath: KeyPath[],
  newValue: string
) => {
  const {
    editor: { port },
  } = getConfiguration();

  await fetch(`http://localhost:${port}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dictionaryPath, keyPath, newValue }),
  });
};

type ContentEditorProps = {
  children: string;
  dictionaryPath: string;
  keyPath: KeyPath[];
};

export const ContentEditor: FC<ContentEditorProps> = ({
  dictionaryPath,
  keyPath,
  children,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOnLongPress = () => {
    setIsEditing(true);
  };

  const startPressTimer = () => {
    pressTimerRef.current = setTimeout(() => {
      handleOnLongPress();
    }, PRESS_DETECT_DURATION);
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
        setIsEditing(false);
      }
    },
    [divRef]
  );

  useEffect(() => {
    // Attach click outside listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup
      document.removeEventListener('mousedown', handleClickOutside);
      clearPressTimer(); // Ensure to clear the timer when component unmounts
    };
  }, [handleClickOutside]);

  const handleOnClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isEditing) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleOnBlur = () => {
    // Stop editing when the element loses focus
    setIsEditing(false);
  };

  const onContentChange = async (e: React.FormEvent<HTMLDivElement>) =>
    await editContent(
      dictionaryPath,
      keyPath,
      e.currentTarget.textContent ?? ''
    );

  return (
    <div
      role="textbox"
      tabIndex={0}
      onKeyUp={() => null}
      contentEditable={isEditing}
      onInput={onContentChange}
      onClick={handleOnClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      onBlur={handleOnBlur}
      suppressContentEditableWarning={true} // To suppress the warning for controlled components
      style={
        isEditing
          ? {
              backgroundColor: 'transparent',
              cursor: 'text',
              display: 'inline',
            }
          : { cursor: 'pointer', display: 'inline' }
      }
      ref={divRef}
    >
      {children}
    </div>
  );
};
