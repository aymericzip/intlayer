'use client';

import { Button } from '@components/Button';
import { cn } from '@utils/cn';
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import { useIntlayer } from 'react-intlayer';
import { EditorBubbleItem, useEditor } from '../novel';
import type { SelectorItem } from './NodeSelector';

/**
 * Inline mark toggles (bold / italic / underline / strike / code) shown in the
 * bubble menu.
 */
export const TextButtons = () => {
  const { editor } = useEditor();
  const content = useIntlayer('markdown-editor');

  if (!editor) return null;

  const items: SelectorItem[] = [
    {
      name: 'bold',
      isActive: (currentEditor) => currentEditor.isActive('bold'),
      command: (currentEditor) =>
        currentEditor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: (currentEditor) => currentEditor.isActive('italic'),
      command: (currentEditor) =>
        currentEditor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: (currentEditor) => currentEditor.isActive('underline'),
      command: (currentEditor) =>
        currentEditor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      isActive: (currentEditor) => currentEditor.isActive('strike'),
      command: (currentEditor) =>
        currentEditor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: 'code',
      isActive: (currentEditor) => currentEditor.isActive('code'),
      command: (currentEditor) =>
        currentEditor.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];

  const getButtonLabel = (name: string) => {
    switch (name) {
      case 'bold':
        return content.bold.value;
      case 'italic':
        return content.italic.value;
      case 'underline':
        return content.underline.value;
      case 'strike':
        return content.strike.value;
      case 'code':
        return content.code.value;
      default:
        return name;
    }
  };

  return (
    <div className="flex">
      {items.map((item) => (
        <EditorBubbleItem
          key={item.name}
          onSelect={(selectedEditor) => item.command(selectedEditor)}
        >
          <Button
            label={getButtonLabel(item.name)}
            size="icon-sm"
            variant="hoverable"
            color="text"
            roundedSize="none"
            Icon={item.icon}
            iconClassName={cn(item.isActive(editor) && 'text-blue-500')}
          />
        </EditorBubbleItem>
      ))}
    </div>
  );
};
