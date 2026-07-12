import type { Editor } from '@tiptap/core';
import { useCurrentEditor } from '@tiptap/react';
import type { FC, PointerEvent as ReactPointerEvent } from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';

const MIN_IMAGE_WIDTH_PX = 64;

const getSelectedImage = (editor: Editor): HTMLImageElement | null =>
  editor.view.dom.querySelector<HTMLImageElement>(
    'img.ProseMirror-selectednode'
  );

type ResizeDirection = 'west' | 'east';

type ImageResizeHandlesProps = {
  editor: Editor;
};

/**
 * Fixed-position overlay aligned with the selected image, exposing two
 * side handles that resize it (aspect ratio preserved) via pointer drag.
 * Replaces the react-moveable dependency with ~100 lines of pointer math.
 */
const ImageResizeHandles: FC<ImageResizeHandlesProps> = ({ editor }) => {
  const [imageRect, setImageRect] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    const updateRect = () => {
      const image = getSelectedImage(editor);
      setImageRect(image ? image.getBoundingClientRect() : null);
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [editor, editor.state.selection]);

  /** Persist the inline style size into the image node attributes. */
  const commitImageSize = (image: HTMLImageElement) => {
    const { selection } = editor.state;
    const rect = image.getBoundingClientRect();

    const setImage = editor.commands.setImage as (options: {
      src: string;
      width: number;
      height: number;
    }) => boolean;

    setImage({
      src: image.src,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    });
    editor.commands.setNodeSelection(selection.from);
  };

  const handlePointerDown =
    (direction: ResizeDirection) => (event: ReactPointerEvent) => {
      const image = getSelectedImage(editor);
      if (!image) return;

      event.preventDefault();
      event.stopPropagation();

      const startX = event.clientX;
      const startRect = image.getBoundingClientRect();
      const aspectRatio =
        image.naturalWidth > 0 && image.naturalHeight > 0
          ? image.naturalWidth / image.naturalHeight
          : startRect.width / Math.max(startRect.height, 1);

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const deltaX =
          direction === 'east'
            ? moveEvent.clientX - startX
            : startX - moveEvent.clientX;
        const width = Math.max(MIN_IMAGE_WIDTH_PX, startRect.width + deltaX);

        image.style.width = `${width}px`;
        image.style.height = `${width / aspectRatio}px`;
        setImageRect(image.getBoundingClientRect());
      };

      const handlePointerUp = () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
        commitImageSize(image);
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    };

  if (!imageRect) return null;

  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{
        top: imageRect.top,
        left: imageRect.left,
        width: imageRect.width,
        height: imageRect.height,
      }}
    >
      {(['west', 'east'] as const).map((direction) => (
        <div
          key={direction}
          role="presentation"
          onPointerDown={handlePointerDown(direction)}
          className="pointer-events-auto absolute top-1/2 h-10 w-1.5 -translate-y-1/2 cursor-ew-resize touch-none rounded-full border border-white bg-neutral/70"
          style={direction === 'west' ? { left: -8 } : { right: -8 }}
        />
      ))}
    </div>
  );
};

/**
 * Renders resize handles over the currently selected image, if any.
 * Meant to be mounted in the editor's `slotAfter`.
 */
export const ImageResizer: FC = () => {
  const { editor } = useCurrentEditor();
  const [, setRenderCount] = useState(0);

  // `useCurrentEditor` does not subscribe to document changes; re-render on
  // selection updates so the handles appear/disappear with image selection.
  useEffect(() => {
    if (!editor) return;
    const forceRender = () => setRenderCount((count) => count + 1);
    editor.on('selectionUpdate', forceRender);
    editor.on('transaction', forceRender);
    return () => {
      editor.off('selectionUpdate', forceRender);
      editor.off('transaction', forceRender);
    };
  }, [editor]);

  if (!editor?.isActive('image')) return null;

  return <ImageResizeHandles editor={editor} />;
};
