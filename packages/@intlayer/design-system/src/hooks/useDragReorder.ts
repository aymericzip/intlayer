'use client';

import { type DragEvent, type KeyboardEvent, useState } from 'react';

/** Side of the drop target the dragged item lands on. */
export type DropPosition = 'before' | 'after';

/** Axis the items are laid out on; drives the keyboard arrows. */
export type ReorderOrientation = 'horizontal' | 'vertical';

/** Props of the element the user grabs (grip, header, tab, label). */
export type DragHandleProps = {
  draggable: true;
  title?: string;
  'data-dragging': boolean;
  onDragStart: (event: DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
};

/** Props of the element accepting a dropped item. */
export type DropZoneProps = {
  'data-drop-position': DropPosition | undefined;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDragLeave: (event: DragEvent<HTMLElement>) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
};

/** Handle and drop zone on the same element. */
export type ReorderProps = DragHandleProps & DropZoneProps;

export type UseDragReorderOptions = {
  /** Ids of the reorderable items, in display order. */
  itemIds: readonly string[];
  /** Moves `sourceId` to the index of `targetId`. */
  onMove: (sourceId: string, targetId: string) => void;
  /** Restricts drops, e.g. to siblings of the same parent. Defaults to all. */
  canMove?: (sourceId: string, targetId: string) => boolean;
  /** Arrow keys moving an item with Alt held. Defaults to `horizontal`. */
  orientation?: ReorderOrientation;
  /** Tooltip of the drag handles. */
  title?: string;
};

const KEYS_BY_ORIENTATION: Record<
  ReorderOrientation,
  { forward: string; backward: string }
> = {
  horizontal: { forward: 'ArrowRight', backward: 'ArrowLeft' },
  vertical: { forward: 'ArrowDown', backward: 'ArrowUp' },
};

/**
 * Native drag and drop reordering of a list, with Alt + arrow keys as the
 * keyboard alternative. Each instance only accepts its own items, so nested
 * lists (tree, structure) reorder independently.
 */
export const useDragReorder = ({
  itemIds,
  onMove,
  canMove = () => true,
  orientation = 'horizontal',
  title,
}: UseDragReorderOptions) => {
  const [draggedId, setDraggedId] = useState<string>();
  const [dropTargetId, setDropTargetId] = useState<string>();

  const resetDrag = () => {
    setDraggedId(undefined);
    setDropTargetId(undefined);
  };

  const getIsDropAllowed = (targetId: string): boolean =>
    draggedId !== undefined &&
    draggedId !== targetId &&
    canMove(draggedId, targetId);

  /** Moving forward lands after the target, moving backward before it. */
  const getDropPosition = (targetId: string): DropPosition | undefined => {
    if (dropTargetId !== targetId || !getIsDropAllowed(targetId)) {
      return undefined;
    }

    return itemIds.indexOf(draggedId as string) < itemIds.indexOf(targetId)
      ? 'after'
      : 'before';
  };

  const getDragHandleProps = (itemId: string): DragHandleProps => ({
    draggable: true,
    title,
    'data-dragging': draggedId === itemId,
    onDragStart: (event) => {
      // Nested lists: only the innermost handle starts the drag
      event.stopPropagation();
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', itemId);
      // Re-rendering the dragged element synchronously cancels the drag in
      // Chromium: defer the state update to the next frame
      requestAnimationFrame(() => setDraggedId(itemId));
    },
    onDragEnd: resetDrag,
    onKeyDown: (event) => {
      if (!event.altKey) return;

      const { forward, backward } = KEYS_BY_ORIENTATION[orientation];
      if (event.key !== forward && event.key !== backward) return;

      const isRightToLeft =
        orientation === 'horizontal' &&
        getComputedStyle(event.currentTarget).direction === 'rtl';
      const step = (event.key === forward) !== isRightToLeft ? 1 : -1;
      const candidateIds =
        step === 1
          ? itemIds.slice(itemIds.indexOf(itemId) + 1)
          : itemIds.slice(0, itemIds.indexOf(itemId)).reverse();
      const neighbourId = candidateIds.find((candidateId) =>
        canMove(itemId, candidateId)
      );

      if (!neighbourId) return;

      event.preventDefault();
      event.stopPropagation();
      onMove(itemId, neighbourId);
    },
  });

  const getDropZoneProps = (itemId: string): DropZoneProps => ({
    'data-drop-position': getDropPosition(itemId),
    onDragOver: (event) => {
      if (!getIsDropAllowed(itemId)) return;
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = 'move';
      if (dropTargetId !== itemId) setDropTargetId(itemId);
    },
    onDragLeave: (event) => {
      // Moving over a child fires `dragleave` on the zone: ignore it
      const nextTarget = event.relatedTarget;
      if (
        nextTarget instanceof Node &&
        event.currentTarget.contains(nextTarget)
      ) {
        return;
      }
      setDropTargetId((targetId) =>
        targetId === itemId ? undefined : targetId
      );
    },
    onDrop: (event) => {
      if (!getIsDropAllowed(itemId)) return;
      event.preventDefault();
      event.stopPropagation();
      onMove(draggedId as string, itemId);
      resetDrag();
    },
  });

  const getReorderProps = (itemId: string): ReorderProps => ({
    ...getDragHandleProps(itemId),
    ...getDropZoneProps(itemId),
  });

  return { draggedId, getDragHandleProps, getDropZoneProps, getReorderProps };
};

/**
 * Insertion line of a drop zone for side-by-side items (columns, tabs), on
 * the side the item lands on. Logical, so it follows RTL.
 */
export const HORIZONTAL_DROP_ZONE_CLASS_NAME =
  'relative data-[drop-position=after]:after:absolute data-[drop-position=before]:after:absolute data-[drop-position=after]:after:inset-y-0 data-[drop-position=before]:after:inset-y-0 data-[drop-position=after]:after:inset-e-0 data-[drop-position=before]:after:inset-s-0 data-[drop-position=after]:after:w-0.5 data-[drop-position=before]:after:w-0.5 data-[drop-position=after]:after:bg-text data-[drop-position=before]:after:bg-text data-[drop-position=after]:after:content-[""] data-[drop-position=before]:after:content-[""]';

/** Insertion line of a drop zone for stacked items (rows, tree nodes). */
export const VERTICAL_DROP_ZONE_CLASS_NAME =
  'relative data-[drop-position=after]:after:absolute data-[drop-position=before]:after:absolute data-[drop-position=after]:after:inset-x-0 data-[drop-position=before]:after:inset-x-0 data-[drop-position=after]:after:-bottom-px data-[drop-position=before]:after:-top-px data-[drop-position=after]:after:h-0.5 data-[drop-position=before]:after:h-0.5 data-[drop-position=after]:after:bg-text data-[drop-position=before]:after:bg-text data-[drop-position=after]:after:content-[""] data-[drop-position=before]:after:content-[""] data-[drop-position=after]:after:z-20 data-[drop-position=before]:after:z-20';
