import { Slot } from '@radix-ui/react-slot';
import type { Editor } from '@tiptap/react';
import { useCurrentEditor } from '@tiptap/react';
import type { ComponentPropsWithoutRef, FC, ReactNode, Ref } from 'react';

interface EditorBubbleItemProps {
  readonly children: ReactNode;
  readonly asChild?: boolean;
  readonly onSelect?: (editor: Editor) => void;
  readonly ref?: Ref<HTMLDivElement>;
}

export const EditorBubbleItem: FC<
  EditorBubbleItemProps & Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'>
> = ({ children, asChild, onSelect, ref, ...rest }) => {
  const { editor } = useCurrentEditor();
  const Comp = asChild ? Slot : 'div';

  if (!editor) return null;

  return (
    <Comp ref={ref} {...rest} onClick={() => onSelect?.(editor)}>
      {children}
    </Comp>
  );
};

export default EditorBubbleItem;
