'use client';

import { Button } from '@components/Button';
import { Sparkles } from 'lucide-react';
import { Fragment, type ReactNode, useEffect } from 'react';
import { EditorBubble, removeAIHighlight, useEditor } from '../novel-';
import { AISelector } from './AISelector';

export type GenerativeMenuSwitchProps = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Bubble menu that toggles between the regular formatting toolbar (its
 * `children`) and the AI command palette.
 */
export const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor();

  useEffect(() => {
    if (!open && editor) removeAIHighlight(editor);
  }, [open, editor]);

  return (
    <EditorBubble
      options={{ placement: open ? 'bottom-start' : 'top' }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open && <AISelector onOpenChange={onOpenChange} />}
      {!open && (
        <Fragment>
          <Button
            label="Ask AI"
            variant="hoverable"
            color="text"
            size="sm"
            roundedSize="none"
            className="gap-1 text-purple-500"
            Icon={Sparkles}
            onClick={() => onOpenChange(true)}
          >
            Ask AI
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  );
};
