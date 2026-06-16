'use client';

import { Button } from '@components/Button';
import { Command, CommandRoot } from '@components/Command';
import { Loader } from '@components/Loader';
import { MarkdownRenderer } from '@components/MarkDownRender';
import { toast } from '@components/Toaster';
import { ArrowUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { addAIHighlight, useEditor } from '../novel';
import { AICompletionCommands } from './AICompletionCommands';
import { AISelectorCommands } from './AISelectorCommands';
import { useAICompletion } from './useAICompletion';

export type AISelectorProps = {
  onOpenChange: (open: boolean) => void;
};

/**
 * The AI command palette shown inside the bubble menu. Lets the user run a
 * preset transformation or a free-form prompt against the current selection,
 * preview the markdown result, then replace / insert / discard it.
 */
export const AISelector = ({ onOpenChange }: AISelectorProps) => {
  const { editor } = useEditor();
  const [inputValue, setInputValue] = useState('');
  const { completion, complete, isLoading, reset } = useAICompletion((error) =>
    toast({ variant: 'error', title: 'AI error', description: error.message })
  );

  if (!editor) return null;

  const hasCompletion = completion.length > 0;

  const getSelectionMarkdown = () => {
    const slice = editor.state.selection.content();
    return editor.storage.markdown.serializer.serialize(
      slice.content
    ) as string;
  };

  return (
    <CommandRoot className="w-[350px]">
      {hasCompletion && (
        <div className="flex max-h-[400px]">
          <div className="relative overflow-y-auto">
            <div className="prose prose-sm dark:prose-invert p-2 px-4">
              <MarkdownRenderer>{completion}</MarkdownRenderer>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 font-medium text-purple-500 text-sm">
          <Sparkles className="mr-2 size-4 shrink-0" />
          AI is thinking
          <div className="mt-1 ml-2">
            <Loader />
          </div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="relative">
            <Command.Input
              value={inputValue}
              onValueChange={setInputValue}
              autoFocus
              placeholder={
                hasCompletion
                  ? 'Tell AI what to do next'
                  : 'Ask AI to edit or generate...'
              }
              onFocus={() => addAIHighlight(editor)}
            />
            <Button
              label="Send"
              size="icon-sm"
              roundedSize="full"
              color="custom"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2 bg-purple-500 text-white hover:bg-purple-900"
              Icon={ArrowUp}
              onClick={() => {
                const text = completion || getSelectionMarkdown();
                complete(text, {
                  body: { option: 'zap', command: inputValue },
                }).then(() => setInputValue(''));
              }}
            />
          </div>
          {hasCompletion ? (
            <AICompletionCommands
              completion={completion}
              onDiscard={() => {
                editor.chain().unsetHighlight().focus().run();
                reset();
                onOpenChange(false);
              }}
            />
          ) : (
            <AISelectorCommands
              onSelect={(value, option) =>
                complete(value, { body: { option } })
              }
            />
          )}
        </>
      )}
    </CommandRoot>
  );
};
