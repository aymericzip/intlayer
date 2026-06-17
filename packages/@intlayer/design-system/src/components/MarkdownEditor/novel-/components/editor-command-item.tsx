import type { Editor, Range } from '@tiptap/core';
import { useCurrentEditor } from '@tiptap/react';
import { CommandEmpty, CommandItem } from 'cmdk';
import type { ComponentPropsWithoutRef, FC, Ref } from 'react';
import { useRange } from '../utils/atoms';

interface EditorCommandItemProps {
  readonly onCommand: ({
    editor,
    range,
  }: {
    editor: Editor;
    range: Range;
  }) => void;
}

export const EditorCommandItem: FC<
  EditorCommandItemProps &
    ComponentPropsWithoutRef<typeof CommandItem> & {
      readonly ref?: Ref<HTMLDivElement>;
    }
> = ({ children, onCommand, ref, ...rest }) => {
  const { editor } = useCurrentEditor();
  const range = useRange();

  if (!editor || !range) return null;

  return (
    <CommandItem
      ref={ref}
      {...rest}
      onSelect={() => onCommand({ editor, range })}
    >
      {children}
    </CommandItem>
  );
};

export const EditorCommandEmpty = CommandEmpty;

export default EditorCommandItem;
