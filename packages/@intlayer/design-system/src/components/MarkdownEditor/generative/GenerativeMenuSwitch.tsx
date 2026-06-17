'use client';

import {
  Button,
  type ButtonColor,
  type ButtonVariant,
} from '@components/Button';
import { Sparkles } from 'lucide-react';
import { Fragment, type ReactNode, useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { EditorBubble, removeAIHighlight, useEditor } from '../novel';
import { AISelector } from './AISelector';

export type GenerativeMenuSwitchProps = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Visual variant forwarded to the AI send button. @default "default" */
  sendButtonVariant?: ButtonVariant;
  /** Color theme forwarded to the AI send button. @default "text" */
  sendButtonColor?: ButtonColor;
};

/**
 * Bubble menu that toggles between the regular formatting toolbar (its
 * `children`) and the AI command palette.
 */
export const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
  sendButtonVariant,
  sendButtonColor,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor();
  const content = useIntlayer('markdown-editor');

  useEffect(() => {
    if (!open && editor) removeAIHighlight(editor);
  }, [open, editor]);

  return (
    <EditorBubble
      options={{ placement: open ? 'bottom-start' : 'top' }}
      className="flex w-fit max-w-[90vw] rounded-lg border-[1.3px] border-neutral/20 bg-card/95 text-text shadow-xl backdrop-blur [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-xl"
    >
      {open && (
        <AISelector
          onOpenChange={onOpenChange}
          sendButtonVariant={sendButtonVariant}
          sendButtonColor={sendButtonColor}
        />
      )}
      {!open && (
        <Fragment>
          <Button
            label={content.askAI.value}
            variant="hoverable"
            color="text"
            size="sm"
            roundedSize="none"
            className="gap-1 text-text"
            Icon={Sparkles}
            onClick={() => onOpenChange(true)}
          >
            {content.askAI}
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  );
};
