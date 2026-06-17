'use client';

import { DropDown } from '@components/DropDown';
import {
  Check,
  CheckSquare,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  type LucideIcon,
  TextIcon,
  TextQuote,
} from 'lucide-react';
import { EditorBubbleItem, type EditorInstance, useEditor } from '../novel-';

const DROPDOWN_ID = 'markdown-editor-node-selector';

export type SelectorItem = {
  name: string;
  icon: LucideIcon;
  command: (editor: NonNullable<EditorInstance>) => void;
  isActive: (editor: NonNullable<EditorInstance>) => boolean;
};

const items: SelectorItem[] = [
  {
    name: 'Text',
    icon: TextIcon,
    command: (editor) => editor.chain().focus().clearNodes().run(),
    isActive: (editor) =>
      editor.isActive('paragraph') &&
      !editor.isActive('bulletList') &&
      !editor.isActive('orderedList'),
  },
  {
    name: 'Heading 1',
    icon: Heading1,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 1 }),
  },
  {
    name: 'Heading 2',
    icon: Heading2,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 2 }),
  },
  {
    name: 'Heading 3',
    icon: Heading3,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 3 }),
  },
  {
    name: 'To-do List',
    icon: CheckSquare,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleTaskList().run(),
    isActive: (editor) => editor.isActive('taskItem'),
  },
  {
    name: 'Bullet List',
    icon: ListOrdered,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleBulletList().run(),
    isActive: (editor) => editor.isActive('bulletList'),
  },
  {
    name: 'Numbered List',
    icon: ListOrdered,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive('orderedList'),
  },
  {
    name: 'Quote',
    icon: TextQuote,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive('blockquote'),
  },
  {
    name: 'Code',
    icon: Code,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive('codeBlock'),
  },
];

/**
 * Bubble-menu selector that converts the current block between paragraph,
 * headings, lists, quote and code. Reuses the design-system `DropDown`.
 */
export const NodeSelector = () => {
  const { editor } = useEditor();
  if (!editor) return null;

  const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
    name: 'Multiple',
  };

  return (
    <DropDown identifier={DROPDOWN_ID}>
      <DropDown.Trigger
        identifier={DROPDOWN_ID}
        label={activeItem.name}
        variant="hoverable"
        color="text"
        size="sm"
        roundedSize="none"
        IconRight={ChevronDown}
      >
        <span className="whitespace-nowrap text-sm">{activeItem.name}</span>
      </DropDown.Trigger>
      <DropDown.Panel identifier={DROPDOWN_ID} isFocusable align="start">
        <div className="w-48 rounded-md border bg-popover p-1 shadow-md">
          {items.map((item) => (
            <EditorBubbleItem
              key={item.name}
              onSelect={(selectedEditor) => item.command(selectedEditor)}
              className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border p-1">
                  <item.icon className="size-3" />
                </div>
                <span>{item.name}</span>
              </div>
              {activeItem.name === item.name && <Check className="size-4" />}
            </EditorBubbleItem>
          ))}
        </div>
      </DropDown.Panel>
    </DropDown>
  );
};
