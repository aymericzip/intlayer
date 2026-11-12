'use client';

import {
  type DragHandleProps,
  type DropPosition,
  type DropZoneProps,
  HORIZONTAL_DROP_ZONE_CLASS_NAME,
  type ReorderOrientation,
  type ReorderProps,
  useDragReorder,
  VERTICAL_DROP_ZONE_CLASS_NAME,
} from '@hooks/useDragReorder';
import type { LocalesValues } from 'intlayer';
import { useCallback } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocaleSwitcherContent } from './LocaleSwitcherContentContext';
import { moveItem } from './moveItem';

export type LocaleDropPosition = DropPosition;
export type LocaleDragHandleProps = DragHandleProps;
export type LocaleDropZoneProps = DropZoneProps;
export type LocaleReorderProps = ReorderProps;

/**
 * Reorders the selected locales by drag and drop, or with Alt + arrow keys.
 * The order is persisted in the locale switcher store, so every view (grid
 * columns, tree, tabs) follows it.
 *
 * @param visibleLocales - Locales rendered by the caller, in display order.
 * @param orientation - `vertical` when locales are stacked (tree view).
 */
export const useLocaleReorder = (
  visibleLocales: readonly string[],
  orientation: ReorderOrientation = 'horizontal'
) => {
  const { setSelectedLocales } = useLocaleSwitcherContent();
  const { reorderLocale } = useIntlayer('locale-switcher-content');

  const moveLocale = useCallback(
    (locale: string, targetLocale: string) =>
      setSelectedLocales((previousLocales) =>
        moveItem(
          previousLocales,
          locale as LocalesValues,
          targetLocale as LocalesValues
        )
      ),
    [setSelectedLocales]
  );

  const reorder = useDragReorder({
    itemIds: visibleLocales,
    onMove: moveLocale,
    orientation,
    title: reorderLocale.value,
  });

  return { ...reorder, moveLocale };
};

/** Insertion line for side-by-side locales (grid columns, tabs). */
export const LOCALE_DROP_ZONE_CLASS_NAME = HORIZONTAL_DROP_ZONE_CLASS_NAME;

/** Insertion line for stacked locales (tree view). */
export const LOCALE_VERTICAL_DROP_ZONE_CLASS_NAME =
  VERTICAL_DROP_ZONE_CLASS_NAME;
