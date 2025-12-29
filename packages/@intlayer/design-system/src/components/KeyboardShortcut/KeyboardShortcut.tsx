'use client';

import { type FC, useEffect, useState } from 'react';
import { useDevice } from '../../hooks/useDevice';
import { cn } from '../../utils/cn';

/**
 * Enum for available keyboard keys
 */
export enum KeyList {
  '⌘' = '⌘',
  Ctrl = 'Ctrl',
  Alt = 'Alt',
  '⌥' = '⌥',
  Shift = 'Shift',
  Meta = 'Meta',
  F = 'F',
  K = 'K',
  L = 'L',
  P = 'P',
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  M = 'M',
  N = 'N',
  O = 'O',
  Q = 'Q',
  R = 'R',
  T = 'T',
  U = 'U',
  V = 'V',
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
  Enter = 'Enter',
  Escape = 'Escape',
  Backspace = 'Backspace',
  Tab = 'Tab',
  Space = 'Space',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  '↑' = '↑',
  '↓' = '↓',
  '←' = '←',
  '→' = '→',
}

/**
 * Type-safe keyboard shortcut combinations
 * Note: Using string type to avoid union type complexity issues
 * Expected format: "Key + Key" (e.g., "⌘ + F", "Ctrl + Shift + K")
 */
export type KeyboardShortcutType = string;

export type KeyboardShortcutProps = {
  /** The keyboard shortcut combination (e.g., "⌘ + F" or "Ctrl + K") */
  shortcut: KeyboardShortcutType;
  /** Callback function triggered when the shortcut is pressed */
  onTriggered?: () => void;
  /** Whether to display the shortcut visually (default: true) */
  display?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Size of the keyboard shortcut display */
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Parse keyboard shortcut string into individual keys
 */
const parseShortcut = (shortcut: string): string[] => {
  return shortcut.split(' + ').map((key) => key.trim());
};

/**
 * Normalize key name for event comparison
 */
const normalizeKey = (key: string): string => {
  const keyMap: Record<string, string> = {
    '⌘': 'Meta',
    Ctrl: 'Control',
    Control: 'Control',
    Alt: 'Alt',
    '⌥': 'Alt',
    Shift: 'Shift',
    Meta: 'Meta',
    '↑': 'ArrowUp',
    '↓': 'ArrowDown',
    '←': 'ArrowLeft',
    '→': 'ArrowRight',
    ArrowUp: 'ArrowUp',
    ArrowDown: 'ArrowDown',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
  };

  return keyMap[key] || key;
};

/**
 * Check if the keyboard event matches the shortcut
 */
const matchesShortcut = (event: KeyboardEvent, keys: string[]): boolean => {
  const normalizedKeys = keys.map(normalizeKey);
  const hasModifiers = {
    Meta: normalizedKeys.includes('Meta'),
    Control: normalizedKeys.includes('Control'),
    Alt: normalizedKeys.includes('Alt'),
    Shift: normalizedKeys.includes('Shift'),
  };

  // Check if all required modifiers are pressed
  if (
    hasModifiers.Meta !== event.metaKey ||
    hasModifiers.Control !== event.ctrlKey ||
    hasModifiers.Alt !== event.altKey ||
    hasModifiers.Shift !== event.shiftKey
  ) {
    return false;
  }

  // Find the non-modifier key
  const nonModifierKey = keys.find(
    (key) =>
      !['⌘', 'Ctrl', 'Control', 'Alt', '⌥', 'Shift', 'Meta'].includes(
        normalizeKey(key)
      )
  );

  if (!nonModifierKey) return false;

  // Normalize the key for comparison
  const normalizedNonModifierKey = normalizeKey(nonModifierKey);

  // Compare the main key
  // For arrow keys, compare directly with event.key
  if (normalizedNonModifierKey.startsWith('Arrow')) {
    return event.key === normalizedNonModifierKey;
  }

  // For other keys, compare case-insensitive
  return event.key.toLowerCase() === normalizedNonModifierKey.toLowerCase();
};

/**
 * Get display key symbol for better visual representation
 */
const getDisplayKey = (key: string): string => {
  const displayMap: Record<string, string> = {
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
  };

  return displayMap[key] || key;
};

/**
 * Get display shortcut based on OS (Mac uses ⌘ and ⌥, others use Ctrl and Alt)
 */
const getDisplayShortcut = (shortcut: string, isMac: boolean): string => {
  let result = shortcut;

  if (isMac) {
    result = result.replace(/Ctrl/g, '⌘');
    result = result.replace(/Alt/g, '⌥');
  } else {
    result = result.replace(/⌘/g, 'Ctrl');
    result = result.replace(/⌥/g, 'Alt');
  }

  // Replace arrow key names with symbols
  result = result.replace(/ArrowUp/g, '↑');
  result = result.replace(/ArrowDown/g, '↓');
  result = result.replace(/ArrowLeft/g, '←');
  result = result.replace(/ArrowRight/g, '→');

  return result;
};

/**
 * KeyboardShortcut Component
 *
 * A reusable component that displays keyboard shortcuts and listens for key combinations.
 * Automatically adapts to Mac (⌘, ⌥) and Windows/Linux (Ctrl, Alt) conventions.
 *
 * @example
 * ```tsx
 * <KeyboardShortcut
 *   shortcut="⌘ + F"
 *   onTriggered={() => setShowSearch(true)}
 * />
 * ```
 */
export const KeyboardShortcut: FC<KeyboardShortcutProps> = ({
  shortcut,
  onTriggered,
  display = true,
  className,
  size = 'md',
}) => {
  const { isMac } = useDevice();
  const displayShortcut = getDisplayShortcut(shortcut, isMac ?? false);
  const keys = parseShortcut(displayShortcut);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 1. Identify input fields
      const target = event.target as HTMLElement;
      const isInputField =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // ... (Your existing key visualization logic here) ...
      // Note: Copied your key tracking logic for context
      const currentKey = event.key;
      const normalizedEventKeys = new Set<string>();
      if (event.metaKey) normalizedEventKeys.add('⌘');
      if (event.ctrlKey) normalizedEventKeys.add('Ctrl');
      if (event.altKey) normalizedEventKeys.add(isMac ? '⌥' : 'Alt');
      if (event.shiftKey) normalizedEventKeys.add('Shift');

      if (currentKey.startsWith('Arrow')) {
        normalizedEventKeys.add(currentKey);
        normalizedEventKeys.add(getDisplayKey(currentKey));
      } else {
        normalizedEventKeys.add(currentKey.toUpperCase());
      }
      setPressedKeys(normalizedEventKeys);

      // 2. Trigger callback if shortcut matches
      if (onTriggered && matchesShortcut(event, keys)) {
        // FIX: Check if the required shortcut is "Escape"
        const isEscapeShortcut = keys.includes('Escape');

        // Only block if it is an input field AND the shortcut is NOT Escape
        if (isInputField && !isEscapeShortcut) {
          return;
        }

        event.preventDefault();
        onTriggered();
      }
    };

    const handleKeyUp = () => {
      setPressedKeys(new Set());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleKeyUp);
    };
  }, [keys, onTriggered, isMac]);
  if (!display) return null;

  /**
   * Check if a key is currently pressed
   */
  const isKeyPressed = (key: string): boolean => {
    const upperKey = key.toUpperCase();
    const normalizedKey = normalizeKey(key);

    return (
      pressedKeys.has(key) ||
      pressedKeys.has(upperKey) ||
      pressedKeys.has(normalizedKey) ||
      // Check for modifier key matches
      (key === '⌘' && pressedKeys.has('Meta')) ||
      (key === 'Ctrl' && pressedKeys.has('Control')) ||
      (key === '⌥' && pressedKeys.has('Alt')) ||
      (key === 'Alt' && pressedKeys.has('Alt')) ||
      // Check for arrow key symbols
      (key === '←' && pressedKeys.has('ArrowLeft')) ||
      (key === '→' && pressedKeys.has('ArrowRight')) ||
      (key === '↑' && pressedKeys.has('ArrowUp')) ||
      (key === '↓' && pressedKeys.has('ArrowDown'))
    );
  };

  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center gap-0.5 p-0.5',
        'rounded-lg [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-xl',
        'font-medium font-sans',
        'border-1 border-neutral/20 text-neutral',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        size === 'lg' && 'text-base',
        className
      )}
    >
      {keys.map((key, index) => {
        const keyId = `${key}-${index}-${shortcut}`;
        const displayKey = getDisplayKey(key);
        return (
          <span key={keyId} className="inline-flex items-center">
            {index > 0 && <span className="text-neutral/50">+</span>}
            <span
              className={cn(
                'min-w-4 px-0.5',
                isKeyPressed(key) && 'scale-120 font-bold text-text'
              )}
            >
              {displayKey}
            </span>
          </span>
        );
      })}
    </kbd>
  );
};
