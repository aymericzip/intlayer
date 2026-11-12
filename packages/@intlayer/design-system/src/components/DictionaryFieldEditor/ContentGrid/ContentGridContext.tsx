'use client';

import { useTranslateJSONDeclaration } from '@api/index';
import { useConfiguration, useEditedContent } from '@intlayer/editor-react';
import type {
  ContentNode,
  Dictionary,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type { NodeType } from '@intlayer/types/nodeType';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  type CellStatus,
  type CellStatusContext,
  getCellStatus,
  indexCells,
} from './cellStatus';
import { type ChangeSetEntry, computeChangeSet } from './changeSet';
import { convertNodeType } from './convertNodeType';
import {
  type ContentCell,
  type ContentRow,
  flattenContentRows,
  getCellId,
} from './flattenContentRows';

/** A cell to translate: its row and the target locale. */
export type CellTarget = { row: ContentRow; cellKey: string };

export type ContentGridModel = {
  dictionary: Dictionary;
  /** Rows of the edited content, in display order. */
  rows: ContentRow[];
  rowsById: Map<string, ContentRow>;
  /** Every locale declared by the project. */
  locales: string[];
  /** Locale AI translates from (the project default locale). */
  sourceLocale: string;
  lockedLocales: ReadonlySet<string>;
  statusContext: CellStatusContext;
  /** Unsaved leaf changes. */
  changeSet: ChangeSetEntry[];
  getStatus: (row: ContentRow, cellKey: string) => CellStatus;
  /** Writes a leaf value; manual edits clear the AI-filled state. */
  setCellValue: (row: ContentRow, cellKey: string, value: ContentNode) => void;
  /**
   * Changes the type of a row, keeping data when the change is a wrap or
   * unwrap. Applied per locale for rows that only exist below a translation.
   */
  changeRowType: (row: ContentRow, nodeType: NodeType) => void;
  /** Tells, without applying it, whether a type change loses data. */
  getIsTypeChangeLossless: (row: ContentRow, nodeType: NodeType) => boolean;
  /** Restores one change-set entry to its saved value. */
  revertChange: (entry: ChangeSetEntry) => void;
  /** Cell ids filled by AI and not yet accepted. */
  aiCellIds: ReadonlySet<string>;
  acceptAICell: (cellId: string) => void;
  acceptAllAICells: () => void;
  /** Restores an AI-filled cell to its saved value. */
  revertAICell: (cellId: string) => void;
  /** Translates the given cells from the source locale; skips locked locales. */
  translateCells: (targets: CellTarget[]) => Promise<void>;
  isTranslating: boolean;
  /** Missing cells of the given locales, locked locales excluded. */
  getMissingTargets: (cellKeys: string[], rowIds?: string[]) => CellTarget[];
};

export const ContentGridContext = createContext<ContentGridModel | undefined>(
  undefined
);

/** Reads the grid model. Must be used under {@link ContentGridProvider}. */
export const useContentGrid = (): ContentGridModel => {
  const model = useContext(ContentGridContext);

  if (!model) {
    throw new Error('useContentGrid must be used inside ContentGridProvider');
  }

  return model;
};

export type ContentGridProviderProps = PropsWithChildren<{
  dictionary: Dictionary;
  /** Locales the current user cannot edit (per-member restrictions). */
  lockedLocales?: string[];
}>;

/**
 * Builds the flat grid model of a dictionary from the saved content and the
 * edited content store, and exposes the editing actions.
 */
export const ContentGridProvider: FC<ContentGridProviderProps> = ({
  dictionary,
  lockedLocales: lockedLocalesProp,
  children,
}) => {
  const configuration = useConfiguration();
  const { editedContent, addEditedContent, removeEditedContent } =
    useEditedContent();
  const { mutateAsync: translateJSON, isPending: isTranslating } =
    useTranslateJSONDeclaration();
  const [aiCellIds, setAICellIds] = useState<ReadonlySet<string>>(
    () => new Set()
  );

  const localId = dictionary.localId as LocalDictionaryId;
  const locales = useMemo(
    () => (configuration?.internationalization?.locales ?? []).map(String),
    [configuration]
  );
  const sourceLocale = String(
    configuration?.internationalization?.defaultLocale ?? locales[0] ?? 'en'
  );
  const lockedLocales = useMemo(
    () => new Set(lockedLocalesProp ?? []),
    [lockedLocalesProp]
  );

  const editedSection = editedContent?.[localId]?.content;
  const currentContent =
    typeof editedSection === 'undefined' ? dictionary.content : editedSection;

  const flattenOptions = useMemo(
    () => ({ locales, sourceLocale }),
    [locales, sourceLocale]
  );
  const originalRows = useMemo(
    () => flattenContentRows(dictionary.content, flattenOptions),
    [dictionary.content, flattenOptions]
  );
  const rows = useMemo(
    () => flattenContentRows(currentContent, flattenOptions),
    [currentContent, flattenOptions]
  );
  const rowsById = useMemo(
    () => new Map(rows.map((row) => [row.id, row])),
    [rows]
  );
  const originalCells = useMemo(() => indexCells(originalRows), [originalRows]);
  const changeSet = useMemo(
    () => computeChangeSet(originalRows, rows),
    [originalRows, rows]
  );

  const statusContext = useMemo<CellStatusContext>(
    () => ({ sourceLocale, originalCells, aiCellIds, lockedLocales }),
    [sourceLocale, originalCells, aiCellIds, lockedLocales]
  );

  const updateAICellIds = useCallback(
    (update: (cellIds: Set<string>) => void) =>
      setAICellIds((previous) => {
        const next = new Set(previous);
        update(next);
        return next;
      }),
    []
  );

  const writeCell = useCallback(
    (cell: ContentCell, value: ContentNode | undefined) => {
      if (value === undefined) {
        removeEditedContent(localId, cell.keyPath);
        return;
      }
      addEditedContent(localId, value, cell.keyPath);
    },
    [addEditedContent, removeEditedContent, localId]
  );

  const setCellValue = useCallback<ContentGridModel['setCellValue']>(
    (row, cellKey, value) => {
      const cell = row.cells[cellKey];
      if (!cell) return;

      writeCell(cell, value);
      updateAICellIds((cellIds) => cellIds.delete(getCellId(row.id, cellKey)));
    },
    [writeCell, updateAICellIds]
  );

  const convertOptions = useMemo(
    () => ({ locales, sourceLocale }),
    [locales, sourceLocale]
  );

  const getTypeChangeTargets = useCallback(
    (
      row: ContentRow
    ): { keyPath: ContentCell['keyPath']; node: ContentNode }[] =>
      row.rootKeyPath
        ? [{ keyPath: row.rootKeyPath, node: row.rootNode }]
        : Object.values(row.cells).map((cell) => ({
            keyPath: cell.keyPath,
            node: cell.value,
          })),
    []
  );

  const changeRowType = useCallback<ContentGridModel['changeRowType']>(
    (row, nodeType) => {
      for (const target of getTypeChangeTargets(row)) {
        const { node } = convertNodeType(target.node, nodeType, convertOptions);
        addEditedContent(localId, node, target.keyPath);
      }
    },
    [getTypeChangeTargets, convertOptions, addEditedContent, localId]
  );

  const getIsTypeChangeLossless = useCallback<
    ContentGridModel['getIsTypeChangeLossless']
  >(
    (row, nodeType) =>
      getTypeChangeTargets(row).every(
        (target) =>
          convertNodeType(target.node, nodeType, convertOptions).isLossless
      ),
    [getTypeChangeTargets, convertOptions]
  );

  const revertChange = useCallback<ContentGridModel['revertChange']>(
    (entry) => {
      writeCell(
        {
          keyPath: entry.keyPath,
          value: entry.previousValue,
          isMissing: false,
        },
        entry.previousValue
      );
      updateAICellIds((cellIds) => cellIds.delete(entry.cellId));
    },
    [writeCell, updateAICellIds]
  );

  const acceptAICell = useCallback(
    (cellId: string) => updateAICellIds((cellIds) => cellIds.delete(cellId)),
    [updateAICellIds]
  );

  const acceptAllAICells = useCallback(() => setAICellIds(new Set()), []);

  const revertAICell = useCallback(
    (cellId: string) => {
      const entry = changeSet.find((change) => change.cellId === cellId);
      if (entry) revertChange(entry);
      else acceptAICell(cellId);
    },
    [changeSet, revertChange, acceptAICell]
  );

  const getMissingTargets = useCallback<ContentGridModel['getMissingTargets']>(
    (cellKeys, rowIds) => {
      const candidateRows = rowIds
        ? rowIds.flatMap((rowId) => rowsById.get(rowId) ?? [])
        : rows;
      const targets: CellTarget[] = [];

      for (const row of candidateRows) {
        if (row.kind !== 'leaf' || !row.isLocalized) continue;
        if (typeof row.cells[sourceLocale]?.value !== 'string') continue;

        for (const cellKey of cellKeys) {
          if (cellKey === sourceLocale || lockedLocales.has(cellKey)) continue;
          if (!row.cells[cellKey]) continue;
          if (getCellStatus(row, cellKey, statusContext) === 'missing') {
            targets.push({ row, cellKey });
          }
        }
      }

      return targets;
    },
    [rows, rowsById, sourceLocale, lockedLocales, statusContext]
  );

  const translateCells = useCallback<ContentGridModel['translateCells']>(
    async (targets) => {
      const targetsByLocale = new Map<string, CellTarget[]>();

      for (const target of targets) {
        if (lockedLocales.has(target.cellKey)) continue;
        const localeTargets = targetsByLocale.get(target.cellKey) ?? [];
        localeTargets.push(target);
        targetsByLocale.set(target.cellKey, localeTargets);
      }

      for (const [outputLocale, localeTargets] of targetsByLocale) {
        const entryFileContent = Object.fromEntries(
          localeTargets.map(({ row }) => [
            row.id,
            row.cells[sourceLocale]?.value ?? '',
          ])
        );

        const response = await translateJSON({
          entryFileContent,
          presetOutputContent: {},
          dictionaryDescription: dictionary.description,
          entryLocale: sourceLocale as never,
          outputLocale: outputLocale as never,
          mode: 'complete',
          aiOptions: {
            apiKey: configuration?.ai?.apiKey,
            model: configuration?.ai?.model,
            temperature: configuration?.ai?.temperature,
          },
        });

        const translated = (response?.data?.fileContent ?? {}) as Record<
          string,
          unknown
        >;
        const filledCellIds: string[] = [];

        for (const { row, cellKey } of localeTargets) {
          const value = translated[row.id];
          const cell = row.cells[cellKey];
          if (typeof value !== 'string' || !cell) continue;

          writeCell(cell, value);
          filledCellIds.push(getCellId(row.id, cellKey));
        }

        updateAICellIds((cellIds) => {
          for (const cellId of filledCellIds) cellIds.add(cellId);
        });
      }
    },
    [
      lockedLocales,
      sourceLocale,
      translateJSON,
      dictionary.description,
      configuration,
      writeCell,
      updateAICellIds,
    ]
  );

  const getStatus = useCallback(
    (row: ContentRow, cellKey: string) =>
      getCellStatus(row, cellKey, statusContext),
    [statusContext]
  );

  const model = useMemo<ContentGridModel>(
    () => ({
      dictionary,
      rows,
      rowsById,
      locales,
      sourceLocale,
      lockedLocales,
      statusContext,
      changeSet,
      getStatus,
      setCellValue,
      changeRowType,
      getIsTypeChangeLossless,
      revertChange,
      aiCellIds,
      acceptAICell,
      acceptAllAICells,
      revertAICell,
      translateCells,
      isTranslating,
      getMissingTargets,
    }),
    [
      dictionary,
      rows,
      rowsById,
      locales,
      sourceLocale,
      lockedLocales,
      statusContext,
      changeSet,
      getStatus,
      setCellValue,
      changeRowType,
      getIsTypeChangeLossless,
      revertChange,
      aiCellIds,
      acceptAICell,
      acceptAllAICells,
      revertAICell,
      translateCells,
      isTranslating,
      getMissingTargets,
    ]
  );

  return (
    <ContentGridContext.Provider value={model}>
      {children}
    </ContentGridContext.Provider>
  );
};
