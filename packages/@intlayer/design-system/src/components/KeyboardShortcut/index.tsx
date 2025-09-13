
'use client';

import { useDevice } from '@/hooks/useDevice';
import { cn } from '@utils/cn';
import { useEffect, type FC, type HTMLAttributes } from 'react';

export enum KeyList {
  '⌘' = '⌘',
  'Ctrl' = 'Ctrl',
  'F' = 'F',
  'K' = 'K',
  'L' = 'L',
}

export type KeyboardShortcut =
  | `${KeyList} + ${KeyList}`
  | `${KeyList} + ${KeyList} + ${KeyList}`;

type KeyboardShortcutProps = HTMLAttributes<HTMLSpanElement> & {
  shortcut: KeyboardShortcut;
  onTriggered: () => void;
};

export const KeyboardShortcut: FC<KeyboardShortcutProps> = ({
  shortcut,
  onTriggered,
  className,
  ...props
}) => {
  const { isMac } = useDevice();

  const keys = shortcut.split(' + ');

  const displayedShortcut = isMac
    ? shortcut
    : shortcut.replace('⌘', 'Ctrl');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifierPressed = isMac ? event.metaKey : event.ctrlKey;
      const regularKeyPressed = keys.find((key: string) => key !== '⌘' && key !== 'Ctrl');

      if (isModifierPressed && event.key.toUpperCase() === regularKeyPressed) {
        event.preventDefault();
        onTriggered();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMac, keys, onTriggered]);

  return (
    <span
      className={cn(
        'rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600',
        className
      )}
      {...props}
    >
      {displayedShortcut}
    </span>
  );
};
