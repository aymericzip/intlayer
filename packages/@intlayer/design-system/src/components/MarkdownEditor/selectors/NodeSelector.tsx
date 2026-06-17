'use client';

import { cn } from '@utils/cn';
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
import { type FC, useEffect, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { type EditorInstance, useEditor } from '../novel';

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
 * headings, lists, quote and code.
 *
 * Uses `onMouseDown` + `preventDefault` on every interactive element so the
 * editor's selection is never cleared while the panel is open.
 */
export const NodeSelector: FC = () => {
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

  const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
    name: 'Multiple',
  };

  const getItemName = (name: string) => {
    switch (name) {
      case 'Text':
        return content.text.value;
      case 'Heading 1':
        return content.heading1.value;
      case 'Heading 2':
        return content.heading2.value;
      case 'Heading 3':
        return content.heading3.value;
      case 'To-do List':
        return content.todoList.value;
      case 'Bullet List':
        return content.bulletList.value;
      case 'Numbered List':
        return content.numberedList.value;
      case 'Quote':
        return content.quote.value;
      case 'Code':
        return content.code.value;
      case 'Multiple':
        return content.multiple.value;
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
        <span>{getItemName(activeItem.name)}</span>
        <ChevronDown
          className={cn('size-3 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] left-0 z-50 w-48 rounded-md border bg-popover p-1 shadow-md">
          {items.map((item) => (
            <button
              type="button"
              key={item.name}
              onMouseDown={(e) => {
                e.preventDefault();
                item.command(editor);
                setIsOpen(false);
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border p-1">
                  <item.icon className="size-3" />
                </div>
                <span>{getItemName(item.name)}</span>
              </div>
              {activeItem.name === item.name && <Check className="size-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
