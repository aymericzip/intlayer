import { dirname, extname, join } from 'node:path';
import {
  collectJsonContentFields,
  getPropertyKeyName,
  nodeEnd,
  nodeStart,
  type OxcNode,
  parseText,
  walkAst,
} from '@intlayer/lsp/utils';
import {
  type DecorationOptions,
  type Disposable,
  Range,
  type TextDocument,
  type TextEditor,
  window,
} from 'vscode';
import {
  onDidChangeConfiguration,
  onDidChangeDictionaries,
} from '../utils/cacheInvalidation';
import { extractScriptContent } from '../utils/extractScript';
import { findProjectRoot } from '../utils/findProjectRoot';
import {
  ALL_FIELDS_USED,
  findCachedUsagesOfDictionary,
  UNTRACKED_FIELDS,
} from '../utils/findUsages';
import {
  getCachedConfig,
  getCachedUnmergedDictionaries,
  isContentDeclarationFile,
} from '../utils/intlayerCache';
import { watchActiveEditor } from '../utils/watchActiveEditor';

const DEBOUNCE_DELAY = 1000;

/** Usage scans are reused this long between keystrokes. */
const USAGE_SCAN_MAX_AGE = 5 * 1000;

const JSON_EXTENSIONS = new Set(['.json', '.jsonc', '.json5']);

const SUPPORTED_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.jsonc',
  '.json5',
  '.vue',
  '.svelte',
]);

/** Strikethrough on the unused key itself. */
const strikeDecorationType = window.createTextEditorDecorationType({
  textDecoration: 'line-through',
  opacity: '0.6',
});

/**
 * End-of-line label: `(unused)`, `(unclear)` for untraced fields, or the
 * duplicate declarations count.
 */
const lineLabelDecorationType = window.createTextEditorDecorationType({
  after: {
    contentText: ' (unused)',
    color: 'rgba(128, 128, 128, 0.3)',
    fontStyle: 'italic',
    margin: '0 0 0 1ch',
  },
});

type ContentField = { dottedKey: string; start: number; end: number };

const isObjectProperty = (node: OxcNode): boolean =>
  node['type'] === 'Property' || node['type'] === 'ObjectProperty';

const getObjectProperties = (objectNode: OxcNode): OxcNode[] =>
  ((objectNode['properties'] as OxcNode[] | undefined) ?? []).filter(
    isObjectProperty
  );

/**
 * Every field declared in a `content` object literal, nested ones as dotted
 * keys. `t({ … })` translation maps are leaves, not nested fields.
 */
const collectContentFields = (
  objectNode: OxcNode,
  parentKey = ''
): ContentField[] =>
  getObjectProperties(objectNode).flatMap((property) => {
    const keyNode = property['key'] as OxcNode;
    const name = getPropertyKeyName(keyNode) ?? '';
    const dottedKey = parentKey ? `${parentKey}.${name}` : name;
    const value = property['value'] as OxcNode | undefined;
    const field = {
      dottedKey,
      start: nodeStart(keyNode),
      end: nodeEnd(keyNode),
    };

    return value?.['type'] === 'ObjectExpression'
      ? [field, ...collectContentFields(value, dottedKey)]
      : [field];
  });

/** The `content` object literal of the dictionary declared in `program`. */
const findContentObject = (program: OxcNode): OxcNode | null => {
  let contentObject: OxcNode | null = null;

  walkAst(program, (node) => {
    // Prune everything once found
    if (contentObject) return true;

    if (node['type'] !== 'ObjectExpression') return false;

    const properties = getObjectProperties(node);
    const findProperty = (name: string) =>
      properties.find(
        (property) =>
          getPropertyKeyName(property['key'] as OxcNode | undefined) === name
      );
    const contentProperty = findProperty('content');
    const contentValue = contentProperty?.['value'] as OxcNode | undefined;

    if (findProperty('key') && contentValue?.['type'] === 'ObjectExpression') {
      contentObject = contentValue;
    }

    return false;
  });

  return contentObject;
};

/**
 * Content fields of a content declaration file — a JS/TS object literal or a
 * JSON file — with the span of each key.
 */
const getContentFields = (text: string, extension: string): ContentField[] => {
  if (JSON_EXTENSIONS.has(extension)) return collectJsonContentFields(text);

  const program = parseText(extractScriptContent(text, extension));
  const contentObject = program ? findContentObject(program) : null;

  return contentObject ? collectContentFields(contentObject) : [];
};

/** End-of-line label for another declaration of the same dictionary. */
const getDuplicateLabel = async (
  document: TextDocument,
  projectDir: string,
  dictionaryKey: string
): Promise<string | null> => {
  const configuration = await getCachedConfig(projectDir);
  const dictionaries =
    (await getCachedUnmergedDictionaries(configuration, dictionaryKey)) ?? [];

  const remoteCount = dictionaries.filter(
    (dictionary) => dictionary.location === 'remote'
  ).length;
  const localCount = dictionaries.filter(
    (dictionary) =>
      dictionary.filePath &&
      join(projectDir, dictionary.filePath) !== document.uri.fsPath
  ).length;

  if (localCount + remoteCount === 0) return null;

  return [
    `(used by ${localCount + remoteCount} more`,
    localCount > 0 ? ` - ${localCount} local` : '',
    remoteCount > 0 ? ` - ${remoteCount} remote` : '',
    ')',
  ].join('');
};

/**
 * In a content declaration file, strike the dictionary key when no source
 * file uses the dictionary, and each content field no source file reads.
 */
const updateUnusedDecorations = async (editor: TextEditor) => {
  const { document } = editor;
  const filePath = document.uri.fsPath;
  const extension = extname(filePath).toLowerCase();

  if (!SUPPORTED_EXTENSIONS.has(extension)) return;

  const text = document.getText();

  // Cheap pre-filter before resolving the project
  if (!/\bkey"?\s*:/.test(text) || !/\bcontent"?\s*:/.test(text)) return;

  const projectDir = findProjectRoot(dirname(filePath));

  if (!projectDir) return;

  // `key: 'x'` in JS/TS, `"key": "x"` in JSON
  const keyMatch = /\bkey"?\s*:\s*(["'])(.*?)\1/.exec(text);

  if (!keyMatch) return;

  const dictionaryKey = keyMatch[2]!;
  const keyRange = new Range(
    document.positionAt(keyMatch.index),
    document.positionAt(keyMatch.index + keyMatch[0].length)
  );

  const configuration = await getCachedConfig(projectDir);

  if (!isContentDeclarationFile(filePath, configuration)) return;

  // Compiler content without saveComponents: the components keep their raw
  // strings, traceable only through the `componentFilePath` of the built
  // dictionary. Without it (e.g. `compiler.noMetadata`), nothing to judge.
  if (
    configuration.compiler?.enabled &&
    !configuration.compiler?.saveComponents
  ) {
    const dictionaries =
      (await getCachedUnmergedDictionaries(configuration, dictionaryKey)) ?? [];
    const isTraceable = dictionaries.some(
      (dictionary) => dictionary.componentFilePath
    );

    if (!isTraceable) {
      editor.setDecorations(strikeDecorationType, []);
      editor.setDecorations(lineLabelDecorationType, []);
      return;
    }
  }

  const strikeDecorations: DecorationOptions[] = [];
  const lineLabelDecorations: DecorationOptions[] = [];

  const endOfLine = (line: number): Range => {
    const { end } = document.lineAt(line).range;

    return new Range(end, end);
  };

  const markUnused = (range: Range, hoverMessage: string) => {
    strikeDecorations.push({ range, hoverMessage });
    lineLabelDecorations.push({ range: endOfLine(range.start.line) });
  };

  /** Label only, no strike: the field may well be read. */
  const markUnclear = (range: Range, hoverMessage: string) => {
    lineLabelDecorations.push({
      range: endOfLine(range.start.line),
      hoverMessage,
      renderOptions: { after: { contentText: ' (unclear)' } },
    });
  };

  const duplicateLabel = await getDuplicateLabel(
    document,
    projectDir,
    dictionaryKey
  ).catch(() => null);

  if (duplicateLabel) {
    lineLabelDecorations.push({
      range: endOfLine(keyRange.start.line),
      renderOptions: { after: { contentText: duplicateLabel } },
    });
  }

  let usages: Awaited<ReturnType<typeof findCachedUsagesOfDictionary>>;

  try {
    usages = await findCachedUsagesOfDictionary(
      projectDir,
      dictionaryKey,
      USAGE_SCAN_MAX_AGE
    );
  } catch (error) {
    console.error(error);
    return;
  }

  if (usages.length === 0) {
    // Another declaration may be the one in use
    if (!duplicateLabel) {
      markUnused(keyRange, 'This dictionary is never used in the project');
    }
  } else {
    const usedKeys = new Set(usages.flatMap((usage) => [...usage.keysUsed]));
    const hasUntrackedUsage = usedKeys.has(UNTRACKED_FIELDS);

    if (!usedKeys.has(ALL_FIELDS_USED)) {
      for (const { dottedKey, start, end } of getContentFields(
        text,
        extension
      )) {
        if (usedKeys.has(dottedKey)) continue;

        const fieldRange = new Range(
          document.positionAt(start),
          document.positionAt(end)
        );

        if (hasUntrackedUsage) {
          markUnclear(
            fieldRange,
            `Property '${dottedKey}' may be used: the dictionary is read where its fields cannot be traced`
          );
        } else {
          markUnused(fieldRange, `Property '${dottedKey}' is unused`);
        }
      }
    }
  }

  editor.setDecorations(strikeDecorationType, strikeDecorations);
  editor.setDecorations(lineLabelDecorationType, lineLabelDecorations);
};

export const intlayerUnusedDecorationProvider = (): Disposable[] => {
  const { disposables, trigger } = watchActiveEditor(
    updateUnusedDecorations,
    DEBOUNCE_DELAY
  );

  // Duplicate counts come from the built dictionaries, scanned patterns from
  // the configuration
  return [
    ...disposables,
    onDidChangeDictionaries(trigger),
    onDidChangeConfiguration(trigger),
  ];
};
