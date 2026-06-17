import { isNodeSelection } from '@tiptap/core';
import { useCurrentEditor } from '@tiptap/react';
import { BubbleMenu, type BubbleMenuProps } from '@tiptap/react/menus';
import type { FC, ReactNode, Ref } from 'react';

export interface EditorBubbleProps extends Omit<BubbleMenuProps, 'editor'> {
  readonly children: ReactNode;
  readonly ref?: Ref<HTMLDivElement>;
}

/**
 * Thin wrapper around Tiptap v3's floating-ui based `BubbleMenu`
 * (`@tiptap/react/menus`). Positioning is configured through the `options`
 * prop (`{ placement, offset, ... }`) — the v2 `tippyOptions` API and the
 * tippy.js dependency it required are gone.
 */
export const EditorBubble: FC<EditorBubbleProps> = ({
  children,
  options,
  ref,
  ...rest
}) => {
  const { editor: currentEditor } = useCurrentEditor();

  const shouldShow: BubbleMenuProps['shouldShow'] = ({ editor, state }) => {
    const { selection } = state;
    const { empty } = selection;

    // Don't show the bubble menu when:
    // - the editor is not editable
    // - the selected node is an image
    // - the selection is empty
    // - the selection is a node selection (e.g. while dragging)
    if (
      !editor.isEditable ||
      editor.isActive('image') ||
      empty ||
      isNodeSelection(selection)
    ) {
      return false;
    }
    return true;
  };

  if (!currentEditor) return null;

  return (
    <div ref={ref}>
      <BubbleMenu
        editor={currentEditor}
        shouldShow={shouldShow}
        options={{ placement: 'top', ...options }}
        {...rest}
      >
        {children}
      </BubbleMenu>
    </div>
  );
};

export default EditorBubble;
