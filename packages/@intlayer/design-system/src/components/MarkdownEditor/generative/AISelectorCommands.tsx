'use client';

import { Command } from '@components/Command';
import {
  ArrowDownWideNarrow,
  CheckCheck,
  RefreshCcwDot,
  StepForward,
  WrapText,
} from 'lucide-react';
import { useIntlayer } from 'react-intlayer';
import { getPrevText, useEditor } from '../novel';
import type { AICompletionOption } from './useAICompletion';

const options: {
  value: Exclude<AICompletionOption, 'zap'>;
  label: string;
  icon: typeof RefreshCcwDot;
}[] = [
  { value: 'improve', label: 'Improve writing', icon: RefreshCcwDot },
  { value: 'fix', label: 'Fix grammar', icon: CheckCheck },
  { value: 'shorter', label: 'Make shorter', icon: ArrowDownWideNarrow },
  { value: 'longer', label: 'Make longer', icon: WrapText },
];

export type AISelectorCommandsProps = {
  onSelect: (value: string, option: AICompletionOption) => void;
};

/**
 * The default command list shown in the AI bubble before a completion exists:
 * transforms applied to the current selection plus "continue writing".
 */
export const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor();
  const content = useIntlayer('markdown-editor');

  if (!editor) return null;

  const getOptionLabel = (value: string) => {
    switch (value) {
      case 'improve':
        return content.improveWriting.value;
      case 'fix':
        return content.fixGrammar.value;
      case 'shorter':
        return content.makeShorter.value;
      case 'longer':
        return content.makeLonger.value;
      default:
        return value;
    }
  };

  return (
    <>
      <Command.Group heading={content.editHeading.value}>
        {options.map((option) => (
          <Command.Item
            key={option.value}
            value={option.value}
            className="flex gap-2 px-4"
            onSelect={(value) => {
              const slice = editor.state.selection.content();
              const text = editor.storage.markdown.serializer.serialize(
                slice.content
              );
              onSelect(text, value as AICompletionOption);
            }}
          >
            <option.icon className="size-4 text-text" />
            {getOptionLabel(option.value)}
          </Command.Item>
        ))}
      </Command.Group>
      <Command.Separator />
      <Command.Group heading={content.moreHeading.value}>
        <Command.Item
          value="continue"
          className="gap-2 px-4"
          onSelect={() => {
            const pos = editor.state.selection.from;
            const text = getPrevText(editor, pos);
            onSelect(text, 'continue');
          }}
        >
          <StepForward className="size-4 text-text" />
          {content.continueWriting}
        </Command.Item>
      </Command.Group>
    </>
  );
};
