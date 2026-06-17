'use client';

import { Command } from '@components/Command';
import { Check, TextQuote, TrashIcon } from 'lucide-react';
import { useEditor } from '../novel-';

export type AICompletionCommandsProps = {
  completion: string;
  onDiscard: () => void;
};

/**
 * Command list shown once the AI has produced a completion: replace the
 * selection, insert below, or discard.
 */
export const AICompletionCommands = ({
  completion,
  onDiscard,
}: AICompletionCommandsProps) => {
  const { editor } = useEditor();
  if (!editor) return null;

  return (
    <>
      <Command.Group>
        <Command.Item
          value="replace"
          className="gap-2 px-4"
          onSelect={() => {
            const { selection } = editor.view.state;
            editor
              .chain()
              .focus()
              .insertContentAt(
                { from: selection.from, to: selection.to },
                completion
              )
              .run();
          }}
        >
          <Check className="size-4 text-muted-foreground" />
          Replace selection
        </Command.Item>
        <Command.Item
          value="insert"
          className="gap-2 px-4"
          onSelect={() => {
            const { selection } = editor.view.state;
            editor
              .chain()
              .focus()
              .insertContentAt(selection.to + 1, completion)
              .run();
          }}
        >
          <TextQuote className="size-4 text-muted-foreground" />
          Insert below
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group>
        <Command.Item
          value="discard"
          className="gap-2 px-4"
          onSelect={onDiscard}
        >
          <TrashIcon className="size-4 text-muted-foreground" />
          Discard
        </Command.Item>
      </Command.Group>
    </>
  );
};
