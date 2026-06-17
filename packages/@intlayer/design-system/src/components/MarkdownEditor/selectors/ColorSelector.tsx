'use client';

import { Check, ChevronDown } from 'lucide-react';
import { type FC, useEffect, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useEditor } from '../novel';

export type ColorMenuItem = {
  name: string;
  color: string;
};

const TEXT_COLORS: ColorMenuItem[] = [
  { name: 'Default', color: 'var(--color-text)' },
  { name: 'Primary', color: 'var(--color-primary-500)' },
  { name: 'Secondary', color: 'var(--color-secondary)' },
  { name: 'Success', color: 'var(--color-success)' },
  { name: 'Warning', color: 'var(--color-warning)' },
  { name: 'Error', color: 'var(--color-error)' },
  { name: 'Neutral', color: 'var(--color-neutral)' },
];

const HIGHLIGHT_COLORS: ColorMenuItem[] = [
  { name: 'Default', color: 'transparent' },
  { name: 'Primary', color: 'var(--color-primary-100)' },
  { name: 'Secondary', color: 'var(--color-secondary-100)' },
  { name: 'Success', color: 'var(--color-success-100)' },
  { name: 'Warning', color: 'var(--color-warning-50)' },
  { name: 'Error', color: 'var(--color-error-100)' },
  { name: 'Neutral', color: 'var(--color-neutral-100)' },
];

/**
 * Bubble-menu selector for text color and highlight color.
 *
 * Uses `onMouseDown` + `preventDefault` on every interactive element so the
 * editor's selection is never cleared while the panel is open.
 */
export const ColorSelector: FC = () => {
  const { editor } = useEditor();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const content = useIntlayer('markdown-editor');

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideMouseDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideMouseDown);
    return () =>
      document.removeEventListener('mousedown', handleOutsideMouseDown);
  }, [isOpen]);

  if (!editor) return null;

  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color })
  );
  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color })
  );

  const getColorName = (name: string) => {
    switch (name) {
      case 'Default':
        return content.colorDefault.value;
      case 'Primary':
        return content.colorPrimary.value;
      case 'Secondary':
        return content.colorSecondary.value;
      case 'Success':
        return content.colorSuccess.value;
      case 'Warning':
        return content.colorWarning.value;
      case 'Error':
        return content.colorError.value;
      case 'Neutral':
        return content.colorNeutral.value;
      default:
        return name;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
        className="flex items-center gap-1 whitespace-nowrap rounded-none px-3 py-1.5 text-sm hover:bg-accent"
      >
        <span
          className="rounded-sm px-1 font-medium"
          style={{
            color: activeColorItem?.color,
            backgroundColor: activeHighlightItem?.color,
          }}
        >
          A
        </span>
        <ChevronDown className="size-3" />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] left-0 z-50 flex w-40 flex-col rounded-md border bg-popover p-1 shadow-md">
          <div className="mb-1 px-2 font-semibold text-muted-foreground text-xs">
            {content.colorHeading.value}
          </div>
          {TEXT_COLORS.map(({ name, color }) => (
            <button
              type="button"
              key={name}
              onMouseDown={(e) => {
                e.preventDefault();
                editor.commands.unsetColor();
                if (name !== 'Default') {
                  editor.chain().focus().setColor(color).run();
                }
                setIsOpen(false);
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <span
                  className="rounded-sm border px-1.5 font-medium"
                  style={{ color }}
                >
                  A
                </span>
                <span>{getColorName(name)}</span>
              </div>
              {editor.isActive('textStyle', { color }) && (
                <Check className="size-3" />
              )}
            </button>
          ))}

          <div className="mt-2 mb-1 px-2 font-semibold text-muted-foreground text-xs">
            {content.highlightHeading.value}
          </div>
          {HIGHLIGHT_COLORS.map(({ name, color }) => (
            <button
              type="button"
              key={name}
              onMouseDown={(e) => {
                e.preventDefault();
                editor.commands.unsetHighlight();
                if (name !== 'Default') {
                  editor.chain().focus().setHighlight({ color }).run();
                }
                setIsOpen(false);
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <span
                  className="rounded-sm border px-1.5 font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </span>
                <span>{getColorName(name)}</span>
              </div>
              {editor.isActive('highlight', { color }) && (
                <Check className="size-3" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
