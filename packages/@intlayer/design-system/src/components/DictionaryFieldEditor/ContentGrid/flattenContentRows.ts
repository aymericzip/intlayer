import {
  getEmptyNode,
  getNodeType,
} from '@intlayer/core/dictionaryManipulator';
import type { ContentNode, TypedNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';

/** Cell key used by rows whose value does not vary by locale. */
export const SHARED_CELL_KEY = '*';

/** How a leaf row is rendered and edited. */
export type LeafKind =
  | 'text'
  | 'number'
  | 'boolean'
  | 'markdown'
  | 'html'
  | 'file'
  | 'nested'
  | 'readonly'
  | 'empty';

/** One value of a row: the whole row when shared, or one locale of it. */
export type ContentCell = {
  /** Full key path of the value, translation segment included. */
  keyPath: KeyPath[];
  /** Value at `keyPath` (synthesized empty node when `isMissing`). */
  value: ContentNode;
  /** True when the locale has no value and an empty one was synthesized. */
  isMissing: boolean;
};

/**
 * One line of the grid. Locale is lifted out of the tree: a translation node
 * never produces its own row, it spreads its children over locale cells.
 */
export type ContentRow = {
  /** Display path, e.g. `features[0].label` or `reviews.one`. */
  id: string;
  /** Last segment of the path. */
  label: string;
  /** Id of the parent row, `undefined` for top-level rows. */
  parentId: string | undefined;
  /** Nesting depth, 0 for top-level rows. */
  depth: number;
  /** Group rows own child rows (object, array, plural…); leaves hold values. */
  kind: 'group' | 'leaf';
  /** Node types from the row's outer node down to its value, e.g. `[translation, plural]`. */
  typeChain: NodeType[];
  /** Rendering hint for leaf rows. */
  leafKind?: LeafKind;
  /** Wrapper nodes around the leaf value (`markdown`, `html`, `insertion`). */
  wrappers: NodeType[];
  /** True when at least one translation node sits above the value. */
  isLocalized: boolean;
  /**
   * Key path of the outer node when it is shared by every locale. Missing for
   * rows that only exist below a translation (`reviews.one` in `t({ en: plural })`).
   */
  rootKeyPath?: KeyPath[];
  /** Outer node at `rootKeyPath`. */
  rootNode?: ContentNode;
  /** Values keyed by locale, or by {@link SHARED_CELL_KEY} when not localized. */
  cells: Record<string, ContentCell>;
  /** Ids of direct child rows, in display order. */
  childIds: string[];
};

export type FlattenContentOptions = {
  /** Locales that must have a cell on every localized row. */
  locales: string[];
  /** Locale used to synthesize the shape of missing locale values. */
  sourceLocale: string;
};

const KEYED_NODE_TYPES: NodeType[] = [
  NodeTypes.ENUMERATION,
  NodeTypes.PLURAL,
  NodeTypes.CONDITION,
  NodeTypes.GENDER,
  NodeTypes.SELECT,
];

const WRAPPER_NODE_TYPES: NodeType[] = [
  NodeTypes.MARKDOWN,
  NodeTypes.HTML,
  NodeTypes.INSERTION,
];

const READONLY_NODE_TYPES: NodeType[] = [
  NodeTypes.REACT_NODE,
  NodeTypes.PREACT_NODE,
  NodeTypes.SOLID_NODE,
  NodeTypes.UNKNOWN,
];

const PLURAL_ORDER = ['zero', 'one', 'two', 'few', 'many', 'other'];

const IDENTIFIER_PATTERN = /^[A-Za-z_$][\w$-]*$/;

/** Appends an object/typed key to a display path. */
const appendKey = (path: string, key: string): string => {
  const segment = IDENTIFIER_PATTERN.test(key)
    ? key
    : `[${JSON.stringify(key)}]`;

  if (path === '') return segment;

  return segment.startsWith('[') ? `${path}${segment}` : `${path}.${segment}`;
};

/** Appends an array index to a display path. */
const appendIndex = (path: string, index: number): string =>
  `${path}[${index}]`;

const getTypedContent = (node: ContentNode): ContentNode =>
  (node as TypedNode)[
    (node as TypedNode).nodeType as keyof TypedNode
  ] as ContentNode;

type WalkContext = {
  path: string;
  label: string;
  parentId: string | undefined;
  depth: number;
  cellKey: string;
  keyPath: KeyPath[];
  wrappers: NodeType[];
  typeChain: NodeType[];
  isLocalized: boolean;
  isMissing: boolean;
};

/**
 * Flattens a dictionary content tree into grid rows, lifting translation
 * nodes out as locale cells so that `md(t(...))`, `t(plural(...))` and
 * `plural(t(...))` all read as "one row, one value per locale".
 */
export const flattenContentRows = (
  content: ContentNode,
  { locales, sourceLocale }: FlattenContentOptions
): ContentRow[] => {
  const rowsById = new Map<string, ContentRow>();
  const topLevelIds: string[] = [];

  const upsertRow = (
    context: WalkContext,
    node: ContentNode,
    kind: ContentRow['kind'],
    typeChain: NodeType[],
    leafKind?: LeafKind
  ): ContentRow => {
    let row = rowsById.get(context.path);

    if (!row) {
      row = {
        id: context.path,
        label: context.label,
        parentId: context.parentId,
        depth: context.depth,
        kind,
        typeChain,
        leafKind,
        wrappers: context.wrappers,
        isLocalized: context.isLocalized,
        cells: {},
        childIds: [],
      };
      rowsById.set(context.path, row);

      if (context.parentId === undefined) {
        topLevelIds.push(context.path);
      } else {
        rowsById.get(context.parentId)?.childIds.push(context.path);
      }
    } else if (kind === 'group' && row.kind === 'leaf') {
      // A locale declares a structure where another declared a value
      row.kind = 'group';
      row.typeChain = typeChain;
      row.leafKind = undefined;
    }

    row.isLocalized ||= context.isLocalized;
    row.cells[context.cellKey] = {
      keyPath: context.keyPath,
      value: node,
      isMissing: context.isMissing,
    };

    return row;
  };

  const enterChild = (
    context: WalkContext,
    row: ContentRow,
    path: string,
    label: string,
    keyPathSegment: KeyPath
  ): WalkContext => ({
    ...context,
    path,
    label,
    parentId: row.id,
    depth: context.depth + 1,
    keyPath: [...context.keyPath, keyPathSegment],
    wrappers: [],
    typeChain: [],
  });

  const walk = (node: ContentNode, context: WalkContext): void => {
    const nodeType = getNodeType(node);
    const typeChain = [...context.typeChain, nodeType];

    // A translation never owns a row: its locales become cells of the rows
    // produced by its children
    if (
      nodeType === NodeTypes.TRANSLATION &&
      context.cellKey === SHARED_CELL_KEY
    ) {
      const translations = (getTypedContent(node) ?? {}) as Record<
        string,
        ContentNode
      >;
      const sourceValue =
        translations[sourceLocale] ?? Object.values(translations)[0];
      const translationLocales = [
        ...new Set([...locales, ...Object.keys(translations)]),
      ];

      for (const locale of translationLocales) {
        const localeValue = translations[locale];
        const isMissing = localeValue === undefined || localeValue === null;

        walk(isMissing ? getEmptyNode(sourceValue) : localeValue, {
          ...context,
          cellKey: locale,
          keyPath: [
            ...context.keyPath,
            { type: NodeTypes.TRANSLATION, key: locale },
          ],
          typeChain,
          isLocalized: true,
          isMissing: context.isMissing || isMissing,
        });
      }

      registerRoot(context, node);
      return;
    }

    if (WRAPPER_NODE_TYPES.includes(nodeType)) {
      const child = getTypedContent(node);
      const childContext: WalkContext = {
        ...context,
        keyPath: [...context.keyPath, { type: nodeType } as KeyPath],
        wrappers: [...context.wrappers, nodeType],
        typeChain,
      };

      if (typeof child === 'string' || child === undefined || child === null) {
        upsertRow(
          childContext,
          child ?? '',
          'leaf',
          typeChain,
          getLeafKind(NodeTypes.TEXT, childContext.wrappers)
        );
      } else {
        walk(child, childContext);
      }

      registerRoot(context, node);
      return;
    }

    if (KEYED_NODE_TYPES.includes(nodeType)) {
      const row = upsertRow(context, node, 'group', typeChain);
      const entries = Object.entries(
        (getTypedContent(node) ?? {}) as Record<string, ContentNode>
      );

      for (const [key, child] of entries) {
        walk(
          child,
          enterChild(context, row, appendKey(context.path, key), key, {
            type: nodeType,
            key,
          } as KeyPath)
        );
      }

      registerRoot(context, node);
      return;
    }

    if (nodeType === NodeTypes.ARRAY) {
      const row = upsertRow(context, node, 'group', typeChain);

      (node as unknown as ContentNode[]).forEach((child, index) => {
        walk(
          child,
          enterChild(
            context,
            row,
            appendIndex(context.path, index),
            `[${index}]`,
            { type: NodeTypes.ARRAY, key: index }
          )
        );
      });

      registerRoot(context, node);
      return;
    }

    if (nodeType === NodeTypes.OBJECT) {
      const isRoot = context.path === '';
      const row = isRoot
        ? undefined
        : upsertRow(context, node, 'group', typeChain);

      for (const [key, child] of Object.entries(
        node as unknown as Record<string, ContentNode>
      )) {
        const childPath = appendKey(context.path, key);
        const segment: KeyPath = { type: NodeTypes.OBJECT, key };

        walk(
          child,
          row
            ? enterChild(context, row, childPath, key, segment)
            : {
                ...context,
                path: childPath,
                label: key,
                keyPath: [...context.keyPath, segment],
                wrappers: [],
                typeChain: [],
              }
        );
      }

      if (!isRoot) registerRoot(context, node);
      return;
    }

    upsertRow(
      context,
      node,
      'leaf',
      typeChain,
      node === undefined ? 'empty' : getLeafKind(nodeType, context.wrappers)
    );
    registerRoot(context, node);
  };

  /**
   * Records the outer node of a row when it is shared by every locale. Called
   * after the children are walked so the outermost node wins.
   */
  const registerRoot = (context: WalkContext, node: ContentNode): void => {
    if (context.cellKey !== SHARED_CELL_KEY) return;

    const row = rowsById.get(context.path);
    if (!row) return;

    row.rootKeyPath = context.keyPath;
    row.rootNode = node;
    row.typeChain = computeTypeChain(node, sourceLocale);
  };

  walk(content, {
    path: '',
    label: '',
    parentId: undefined,
    depth: 0,
    cellKey: SHARED_CELL_KEY,
    keyPath: [],
    wrappers: [],
    typeChain: [],
    isLocalized: false,
    isMissing: false,
  });

  // Plural categories always read in CLDR order, whatever locale declared them
  for (const row of rowsById.values()) {
    if (row.typeChain[row.typeChain.length - 1] !== NodeTypes.PLURAL) continue;
    row.childIds.sort(
      (first, second) =>
        PLURAL_ORDER.indexOf(rowsById.get(first)?.label ?? '') -
        PLURAL_ORDER.indexOf(rowsById.get(second)?.label ?? '')
    );
  }

  const orderedRows: ContentRow[] = [];
  const visit = (rowId: string) => {
    const row = rowsById.get(rowId);
    if (!row) return;
    orderedRows.push(row);
    row.childIds.forEach(visit);
  };
  topLevelIds.forEach(visit);

  return orderedRows;
};

/** Rendering hint of a leaf, a string inside `md()` / `html()` included. */
const getLeafKind = (nodeType: NodeType, wrappers: NodeType[]): LeafKind => {
  if (nodeType === NodeTypes.TEXT && wrappers.includes(NodeTypes.MARKDOWN)) {
    return 'markdown';
  }
  if (nodeType === NodeTypes.TEXT && wrappers.includes(NodeTypes.HTML)) {
    return 'html';
  }
  if (nodeType === NodeTypes.NUMBER) return 'number';
  if (nodeType === NodeTypes.BOOLEAN) return 'boolean';
  if (nodeType === NodeTypes.FILE) return 'file';
  if (nodeType === NodeTypes.NESTED) return 'nested';
  if (nodeType === NodeTypes.NULL) return 'empty';
  if (READONLY_NODE_TYPES.includes(nodeType)) return 'readonly';
  return 'text';
};

/**
 * Lists node types from `node` down through translation and wrapper layers,
 * e.g. `md(t('…'))` → `[markdown, translation, text]`.
 */
export const computeTypeChain = (
  node: ContentNode,
  sourceLocale: string
): NodeType[] => {
  const chain: NodeType[] = [];
  let current: ContentNode = node;

  for (let depth = 0; depth < 8; depth++) {
    const nodeType = getNodeType(current);
    chain.push(nodeType);

    if (nodeType === NodeTypes.TRANSLATION) {
      const translations = (getTypedContent(current) ?? {}) as Record<
        string,
        ContentNode
      >;
      current = translations[sourceLocale] ?? Object.values(translations)[0];
      continue;
    }

    if (WRAPPER_NODE_TYPES.includes(nodeType)) {
      current = getTypedContent(current);
      continue;
    }

    break;
  }

  return chain;
};

/** Leaf rows only: the rows that actually carry values. */
export const getLeafRows = (rows: ContentRow[]): ContentRow[] =>
  rows.filter((row) => row.kind === 'leaf');

/** Cell keys a row exposes: its locales, or the shared key. */
export const getRowCellKeys = (row: ContentRow): string[] =>
  Object.keys(row.cells);

/** Stable identifier of one cell, e.g. `title::fr`. */
export const getCellId = (rowId: string, cellKey: string): string =>
  `${rowId}::${cellKey}`;

/**
 * True when the root of a dictionary is a single markdown document
 * (a `.content.md` file), which is edited as a document, not as a grid.
 */
export const getIsMarkdownDocument = (content: ContentNode): boolean =>
  getNodeType(content) === NodeTypes.MARKDOWN;
