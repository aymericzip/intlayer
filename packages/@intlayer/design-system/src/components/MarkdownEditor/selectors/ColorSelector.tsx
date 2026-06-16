'use client';

import { DropDown } from '@components/DropDown';
import { Check, ChevronDown } from 'lucide-react';
import { EditorBubbleItem, useEditor } from '../novel';

const DROPDOWN_ID = 'markdown-editor-color-selector';

export type ColorMenuItem = {
  name: string;
  color: string;
};

const TEXT_COLORS: ColorMenuItem[] = [
  { name: 'Default', color: 'var(--novel-black)' },
  { name: 'Purple', color: '#9333EA' },
  { name: 'Red', color: '#E00000' },
  { name: 'Yellow', color: '#EAB308' },
  { name: 'Blue', color: '#2563EB' },
  { name: 'Green', color: '#008A00' },
  { name: 'Orange', color: '#FFA500' },
  { name: 'Pink', color: '#BA4081' },
  { name: 'Gray', color: '#A8A29E' },
];

const HIGHLIGHT_COLORS: ColorMenuItem[] = [
  { name: 'Default', color: 'var(--novel-highlight-default)' },
  { name: 'Purple', color: 'var(--novel-highlight-purple)' },
  { name: 'Red', color: 'var(--novel-highlight-red)' },
  { name: 'Yellow', color: 'var(--novel-highlight-yellow)' },
  { name: 'Blue', color: 'var(--novel-highlight-blue)' },
  { name: 'Green', color: 'var(--novel-highlight-green)' },
  { name: 'Orange', color: 'var(--novel-highlight-orange)' },
  { name: 'Pink', color: 'var(--novel-highlight-pink)' },
  { name: 'Gray', color: 'var(--novel-highlight-gray)' },
];

/**
 * Bubble-menu selector for text color and highlight color. Reuses the
 * design-system `DropDown`.
 */
export const ColorSelector = () => {
  const { editor } = useEditor();
  if (!editor) return null;

  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color })
  );
  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color })
  );

  return (
    <DropDown identifier={DROPDOWN_ID}>
      <DropDown.Trigger
        identifier={DROPDOWN_ID}
        label="Text color"
        variant="hoverable"
        color="text"
        size="sm"
        roundedSize="none"
        IconRight={ChevronDown}
      >
        <span
          className="rounded-sm px-1"
          style={{
            color: activeColorItem?.color,
            backgroundColor: activeHighlightItem?.color,
          }}
        >
          A
        </span>
      </DropDown.Trigger>
      <DropDown.Panel identifier={DROPDOWN_ID} isFocusable align="start">
        <div className="flex max-h-80 w-48 flex-col overflow-y-auto rounded-md border bg-popover p-1 shadow-md">
          <div className="flex flex-col">
            <div className="my-1 px-2 font-semibold text-muted-foreground text-sm">
              Color
            </div>
            {TEXT_COLORS.map(({ name, color }) => (
              <EditorBubbleItem
                key={name}
                onSelect={(selectedEditor) => {
                  selectedEditor.commands.unsetColor();
                  if (name !== 'Default') {
                    selectedEditor
                      .chain()
                      .focus()
                      .setColor(color || '')
                      .run();
                  }
                }}
                className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="rounded-sm border px-2 py-px font-medium"
                    style={{ color }}
                  >
                    A
                  </div>
                  <span>{name}</span>
                </div>
                {editor.isActive('textStyle', { color }) && (
                  <Check className="size-4" />
                )}
              </EditorBubbleItem>
            ))}
          </div>
          <div>
            <div className="my-1 px-2 font-semibold text-muted-foreground text-sm">
              Background
            </div>
            {HIGHLIGHT_COLORS.map(({ name, color }) => (
              <EditorBubbleItem
                key={name}
                onSelect={(selectedEditor) => {
                  selectedEditor.commands.unsetHighlight();
                  if (name !== 'Default') {
                    selectedEditor
                      .chain()
                      .focus()
                      .setHighlight({ color })
                      .run();
                  }
                }}
                className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="rounded-sm border px-2 py-px font-medium"
                    style={{ backgroundColor: color }}
                  >
                    A
                  </div>
                  <span>{name}</span>
                </div>
                {editor.isActive('highlight', { color }) && (
                  <Check className="size-4" />
                )}
              </EditorBubbleItem>
            ))}
          </div>
        </div>
      </DropDown.Panel>
    </DropDown>
  );
};
