#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, isAbsolute, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildComponentFilesList } from '@intlayer/chokidar/utils';
import { getConfiguration } from '@intlayer/config/node';
import type { IntlayerConfig } from '@intlayer/types/config';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import {
  type CompletionItem,
  CompletionItemKind,
  type CompletionParams,
  createConnection,
  type Diagnostic,
  DiagnosticSeverity,
  type Hover,
  type HoverParams,
  type InitializeParams,
  type InitializeResult,
  Location,
  MarkupKind,
  Position,
  ProposedFeatures,
  Range,
  type ReferenceParams,
  TextDocumentSyncKind,
  TextDocuments,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  formatDictionaryHover,
  formatFieldHover,
  formatFieldValue,
  getFieldByPath,
  getFieldsAtPath,
} from './dictionaryUtils';
import {
  escapeRegularExpression,
  findFieldRangesInFile,
  offsetToRange,
} from './findFieldInFile';
import { findKeyAtOffset } from './findKeyAtOffset';
import {
  findContentFieldAtOffset,
  findKeyInContentFile,
} from './findKeyInContentFile';
import { findUsageFieldAtOffset } from './findUsageFieldAtOffset';
import {
  getFirstStringArg,
  isIntlayerCall,
  type OxcNode,
  parseText,
  walkAst,
} from './oxcUtils';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

/**
 * Send a log line to the client's Output panel (View → Output → "Intlayer LSP").
 * Uses connection.console.log so it travels over the JSON-RPC channel and never
 * touches stdout (which is reserved for the LSP protocol).
 */
const log = (message: string): void =>
  connection.console.log(`[Intlayer LSP] ${message}`);

let workspaceRoot: string | null | undefined;

type WorkspaceConfig = Pick<
  IntlayerConfig,
  'system' | 'build' | 'content' | 'compiler'
>;

/**
 * Resolve (and cache) the Intlayer configuration for the current workspace.
 * The LSP process cwd is not the project root, so we must resolve the config
 * from `workspaceRoot` to get the right `system`/`build`/`content` paths.
 */
const projectConfigs = new Map<string, WorkspaceConfig>();

type DictionariesCache = {
  dictionaries: ReturnType<typeof getUnmergedDictionaries>;
  cachedAt: number;
};
const projectDictionaries = new Map<string, DictionariesCache>();
const DICTIONARY_CACHE_TTL_MS = 5_000;

type SourceFilesCache = {
  files: string[];
  cachedAt: number;
};
const projectSourceFiles = new Map<string, SourceFilesCache>();
const SOURCE_FILES_CACHE_TTL_MS = 30_000;

const invalidateConfigCaches = () => {
  projectConfigs.clear();
  projectDictionaries.clear();

  projectSourceFiles.clear();
};

const getProjectConfig = (absolutePath: string): WorkspaceConfig | null => {
  try {
    const baseDir = dirname(absolutePath);
    // Find the closest intlayer config relative to the file.
    const { system, build, content, compiler } = getConfiguration({ baseDir });
    const cacheKey = system.baseDir;

    if (!projectConfigs.has(cacheKey)) {
      projectConfigs.set(cacheKey, { system, build, content, compiler });
      log(
        `getProjectConfig — OK baseDir=${system.baseDir} unmergedDictionariesDir=${system.unmergedDictionariesDir}`
      );
    }
    return projectConfigs.get(cacheKey)!;
  } catch (error) {
    log(`getProjectConfig — FAILED: ${error}`);
    return null;
  }
};

const getUnmergedDictionariesCached = (
  config: WorkspaceConfig
): ReturnType<typeof getUnmergedDictionaries> => {
  const cacheKey = config.system.baseDir;
  const cached = projectDictionaries.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.cachedAt < DICTIONARY_CACHE_TTL_MS) {
    return cached.dictionaries;
  }

  const dictionaries = getUnmergedDictionaries(config);
  projectDictionaries.set(cacheKey, { dictionaries, cachedAt: now });
  return dictionaries;
};

// ---------------------------------------------------------------------------
// Pattern helpers — derived lazily from the live config.
// ---------------------------------------------------------------------------

const isContentFile = (uri: string, config: WorkspaceConfig): boolean => {
  const fileExtensions = config.content.fileExtensions ?? [];
  return fileExtensions.some((extension) => uri.endsWith(extension));
};

// ---------------------------------------------------------------------------
// Async I/O helpers
// ---------------------------------------------------------------------------

/** Read a file as UTF-8, returning null on any error. */
const tryReadFile = async (filePath: string): Promise<string | null> => {
  try {
    return await readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
};

/**
 * Run `callback` over every item with at most `limit` tasks in-flight at once.
 * JS is single-threaded so `results.push` inside callback is race-free.
 */
const runConcurrent = async <T>(
  items: T[],
  callback: (item: T) => Promise<void>,
  limit = 50
): Promise<void> => {
  if (items.length === 0) return;
  let index = 0;
  const worker = async () => {
    while (index < items.length) {
      await callback(items[index++]!);
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker)
  );
};

/** Find the `key: "<key>"` line inside a content file so the cursor lands on it. */
const getKeyRange = async (
  absolutePath: string,
  key: string
): Promise<Range> => {
  try {
    const content = await readFile(absolutePath, 'utf-8');
    const lines = content.split(/\r?\n/);
    const keyRegularExpression = new RegExp(
      `key\\s*:\\s*['"\`]${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`
    );

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const column = lines[lineIndex]?.search(keyRegularExpression);

      if (column !== undefined && column !== -1) {
        return Range.create(
          Position.create(lineIndex, column),
          Position.create(lineIndex, lines[lineIndex]!.length)
        );
      }
    }
  } catch {
    // fall through to the top of the file
  }

  return Range.create(Position.create(0, 0), Position.create(0, 0));
};

/**
 * Return every `.content` file location that declares the given key.
 * A key can be split across several content files (merged dictionaries), so we
 * return one `Location` per source file, pointing at the `key:` declaration.
 */
const getContentDeclarationLocations = async (
  key: string,
  absolutePath: string
): Promise<Location[]> => {
  const config = getProjectConfig(absolutePath);

  if (!config) return [];

  const unmergedDictionaries = getUnmergedDictionariesCached(config);
  const dictionaries = Object.values(unmergedDictionaries)
    .flat()
    .filter((dictionary) => dictionary?.key === key && dictionary.filePath);

  const locations: Location[] = [];

  await runConcurrent(dictionaries, async (dictionary) => {
    const filePath = dictionary.filePath!;
    const absolutePath = isAbsolute(filePath)
      ? filePath
      : join(config.system.baseDir, filePath);

    if (!existsSync(absolutePath)) return;

    locations.push(
      Location.create(
        pathToFileURL(absolutePath).href,
        await getKeyRange(absolutePath, key)
      )
    );
  });

  return locations;
};

/**
 * Return the cached source-file list, re-scanning only when the cache has
 * expired or been explicitly invalidated (config change, watched-file event).
 */
const getSourceFiles = async (
  directory: string,
  config: WorkspaceConfig
): Promise<string[]> => {
  const now = Date.now();
  const cached = projectSourceFiles.get(directory);

  if (cached && now - cached.cachedAt < SOURCE_FILES_CACHE_TTL_MS) {
    return cached.files;
  }
  const startTime = Date.now();
  const files = buildComponentFilesList(config as unknown as IntlayerConfig, [
    '**/.output/**',
    '**/.svelte-kit/**',
    '**/src-tauri/**',
    '**/.next/**',
    '**/.nuxt/**',
    '**/.expo/**',
    '**/.vercel/**',
    '**/.turbo/**',
    '**/.tanstack/**',
    '**/dist/**',
    '**/build/**',
    '**/node_modules/**',
  ]);
  projectSourceFiles.set(directory, { files, cachedAt: Date.now() });
  log(
    `source files scanned: ${files.length} file(s) in ${Date.now() - startTime}ms`
  );
  return files;
};

/**
 * Return every source-file location that calls useIntlayer / getIntlayer with
 * the given key.
 */
const getKeyUsageLocations = async (
  key: string,
  absolutePath: string
): Promise<Location[]> => {
  const config = getProjectConfig(absolutePath);

  if (!config) return [];

  const usageRegularExpression = new RegExp(
    `\\b(?:useIntlayer|getIntlayer)\\b\\s*(?:<[^<>()]*>)?\\s*\\(\\s*(['"\`])${escapeRegularExpression(key)}\\1`,
    'g'
  );

  const filePaths = await getSourceFiles(config.system.baseDir, config);
  const locations: Location[] = [];
  const startTime = Date.now();

  await runConcurrent(filePaths, async (filePath) => {
    const text = await tryReadFile(filePath);
    // Quick string check before running the regex — skips the vast majority of files

    if (!text?.includes(key)) return;

    for (const match of text.matchAll(usageRegularExpression)) {
      const matchStart = match.index!;
      const matchEnd = matchStart + match[0].length;
      locations.push(
        Location.create(
          pathToFileURL(filePath).href,
          offsetToRange(text, matchStart, matchEnd)
        )
      );
    }
  });

  log(
    `getKeyUsageLocations("${key}") — ${filePaths.length} file(s) searched in ${Date.now() - startTime}ms → ${locations.length} hit(s)`
  );
  return locations;
};

/**
 * Return every source-file location that accesses the field at `fieldPath` on
 * the result of `useIntlayer(dictionaryKey)` / `getIntlayer(dictionaryKey)`.
 *
 * `fieldPath` is an array of property names from the content root to the
 * target field (e.g. `['searchInput', 'text']` for a nested field).
 * Single-element paths (e.g. `['greet']`) behave like the previous
 * single-`fieldName` API.
 */
const getFieldUsageLocations = async (
  dictionaryKey: string,
  fieldPath: string[],
  absolutePath: string
): Promise<Location[]> => {
  const config = getProjectConfig(absolutePath);

  if (!config || fieldPath.length === 0) return [];

  const leafFieldName = fieldPath[fieldPath.length - 1]!;
  const escapedKey = escapeRegularExpression(dictionaryKey);
  const escapedLeaf = escapeRegularExpression(leafFieldName);
  const useCallRegularExpression = new RegExp(
    `\\b(?:useIntlayer|getIntlayer)\\b(?:<[^<>()]*>)?\\s*\\(\\s*['"\`]${escapedKey}['"\`]`
  );

  const filePaths = await getSourceFiles(config.system.baseDir, config);
  const locations: Location[] = [];
  const startTime = Date.now();

  await runConcurrent(filePaths, async (filePath) => {
    const text = await tryReadFile(filePath);

    if (!text) return;
    // Pre-filter: dictionaryKey and every segment of the path must appear in the file

    if (!text.includes(dictionaryKey)) return;

    if (fieldPath.some((segment) => !text.includes(segment))) return;

    if (!useCallRegularExpression.test(text)) return;

    for (const range of findFieldRangesInFile(
      text,
      escapedKey,
      leafFieldName,
      escapedLeaf,
      fieldPath
    )) {
      locations.push(Location.create(pathToFileURL(filePath).href, range));
    }
  });

  log(
    `getFieldUsageLocations("${dictionaryKey}.${fieldPath.join('.')}") — ${filePaths.length} file(s) searched in ${Date.now() - startTime}ms → ${locations.length} hit(s)`
  );
  return locations;
};

/**
 * Find the line/column of `fieldName` as a property key inside a content file.
 * Looks for `fieldName:` (the field definition), not just any occurrence.
 * Falls back to the top of the file
 *  if the field cannot be located.
 */
const getFieldRangeInContentFile = async (
  absolutePath: string,
  fieldName: string
): Promise<Range> => {
  const content = await tryReadFile(absolutePath);

  if (!content)
    return Range.create(Position.create(0, 0), Position.create(0, 0));

  const lines = content.split(/\r?\n/);
  // Match `fieldName:` at an object property key position (not a value)
  const fieldRegularExpression = new RegExp(
    `(?<![.\\w])${escapeRegularExpression(fieldName)}(?![\\w])\\s*:`
  );

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]!;
    const matchPosition = line.search(fieldRegularExpression);

    if (matchPosition === -1) continue;
    const column = line.indexOf(fieldName, matchPosition);

    if (column === -1) continue;
    return Range.create(
      Position.create(lineIndex, column),
      Position.create(lineIndex, column + fieldName.length)
    );
  }

  return Range.create(Position.create(0, 0), Position.create(0, 0));
};

/**
 * Return every content-file location where `fieldName` is defined as a
 * property of the dictionary with the given `dictionaryKey`.
 */
const getContentFieldLocations = async (
  dictionaryKey: string,
  fieldName: string,
  absolutePath: string
): Promise<Location[]> => {
  const config = getProjectConfig(absolutePath);

  if (!config) return [];

  const unmergedDictionaries = getUnmergedDictionariesCached(config);
  const dictionaries = Object.values(unmergedDictionaries)
    .flat()
    .filter(
      (dictionary) => dictionary?.key === dictionaryKey && dictionary.filePath
    );

  const locations: Location[] = [];

  await runConcurrent(dictionaries, async (dictionary) => {
    const filePath = dictionary.filePath!;
    const absolutePath = isAbsolute(filePath)
      ? filePath
      : join(config.system.baseDir, filePath);

    if (!existsSync(absolutePath)) return;

    locations.push(
      Location.create(
        pathToFileURL(absolutePath).href,
        await getFieldRangeInContentFile(absolutePath, fieldName)
      )
    );
  });

  return locations;
};

// ---------------------------------------------------------------------------
// Diagnostics — push-based (no capability needed)
// ---------------------------------------------------------------------------

const DIAGNOSTIC_DEBOUNCE_MS = 300;
const diagnosticTimers = new Map<string, ReturnType<typeof setTimeout>>();

const computeDiagnostics = (
  text: string,
  config: WorkspaceConfig
): Diagnostic[] => {
  const program = parseText(text);

  if (!program) return [];

  const unmergedDictionaries = getUnmergedDictionariesCached(config);
  const diagnostics: Diagnostic[] = [];

  walkAst(program, (node) => {
    if (!isIntlayerCall(node)) return;
    const key = getFirstStringArg(node);

    if (!key) return;

    const known = Object.values(unmergedDictionaries)
      .flat()
      .some((dictionary) => dictionary?.key === key);

    if (!known) {
      const args = node['arguments'] as OxcNode[] | undefined;
      const firstArg = args?.[0];

      if (firstArg) {
        diagnostics.push({
          range: offsetToRange(
            text,
            firstArg['start'] as number,
            firstArg['end'] as number
          ),
          severity: DiagnosticSeverity.Warning,
          source: 'intlayer',
          message: `Dictionary key "${key}" is not declared in any content file`,
        });
      }
    }
    return true; // prune: arguments can't be useIntlayer calls
  });

  return diagnostics;
};

const sendDiagnosticsForDocument = (
  uri: string,
  text: string,
  version: number | null
): void => {
  const absolutePath = decodeURIComponent(new URL(uri).pathname);
  const config = getProjectConfig(absolutePath);

  const diagnostics =
    config && !isContentFile(uri, config)
      ? computeDiagnostics(text, config)
      : [];

  connection.sendDiagnostics({
    uri,
    version: version ?? undefined,
    diagnostics,
  });
};

const scheduleDiagnostics = (
  uri: string,
  text: string,
  version: number | null
): void => {
  const existing = diagnosticTimers.get(uri);

  if (existing !== undefined) clearTimeout(existing);

  diagnosticTimers.set(
    uri,
    setTimeout(() => {
      diagnosticTimers.delete(uri);
      sendDiagnosticsForDocument(uri, text, version);
    }, DIAGNOSTIC_DEBOUNCE_MS)
  );
};

// ---------------------------------------------------------------------------
// Completion context detection
// ---------------------------------------------------------------------------

type CompletionCtx =
  | { kind: 'key' }
  | { kind: 'field'; dictionaryKey: string; fieldPath: string[] }
  | null;

/** Find the dictionary key for a simple variable assigned from useIntlayer/getIntlayer. */
const resolveVariableToDictionaryKey = (
  program: OxcNode,
  varName: string
): string | null => {
  let result: string | null = null;

  walkAst(program, (node) => {
    if (result) return true;

    if (node['type'] !== 'VariableDeclarator') return;
    const id = node['id'] as OxcNode | undefined;

    if (id?.['type'] !== 'Identifier' || (id['name'] as string) !== varName)
      return;
    const init = node['init'] as OxcNode | undefined;

    if (!init || !isIntlayerCall(init)) return;
    result = getFirstStringArg(init);
    return true;
  });
  return result;
};

/**
 * Detect what kind of completion is appropriate at the given offset.
 *
 * Handles:
 *   - key completion: cursor inside first string arg of useIntlayer/getIntlayer
 *   - field (member): cursor after `variable.` where variable came from useIntlayer
 *   - field (destructure): cursor inside `const { | } = useIntlayer("key")`
 */
const getCompletionContext = (
  textBefore: string,
  textAfter: string,
  program: OxcNode | null
): CompletionCtx => {
  // Key completion

  if (
    /\b(?:useIntlayer|getIntlayer)\b(?:<[^<>]*>)?\s*\(\s*['"`][^'"`\n]*$/.test(
      textBefore
    )
  ) {
    return { kind: 'key' };
  }

  // Field completion via member access: rootVar.path.to.
  const memberMatch = /\b(\w+)((?:\.\w+)*)\.$/.exec(textBefore);

  if (memberMatch && program) {
    const rootVar = memberMatch[1]!;
    const chainStr = memberMatch[2]!;
    const dictKey = resolveVariableToDictionaryKey(program, rootVar);

    if (dictKey) {
      const fieldPath = chainStr ? chainStr.slice(1).split('.') : [];
      return { kind: 'field', dictionaryKey: dictKey, fieldPath };
    }
  }

  // Field completion inside destructuring: const { | } = useIntlayer("key")

  if (/(?:const|let|var)\s*\{[^}]*$/.test(textBefore)) {
    const destructMatch =
      /^[^}]*\}\s*=\s*(?:useIntlayer|getIntlayer)(?:<[^<>]*>)?\s*\(\s*['"`]([^'"`\n]+)['"`]/.exec(
        textAfter
      );

    if (destructMatch) {
      return { kind: 'field', dictionaryKey: destructMatch[1]!, fieldPath: [] };
    }
  }

  return null;
};

connection.onInitialize((parameters: InitializeParams): InitializeResult => {
  workspaceRoot =
    parameters.rootPath ||
    (parameters.workspaceFolders?.[0]?.uri
      ? decodeURIComponent(new URL(parameters.workspaceFolders[0].uri).pathname)
      : undefined);
  invalidateConfigCaches();

  log(`initialized — workspaceRoot: ${workspaceRoot ?? '(none)'}`);

  if (parameters.workspaceFolders?.length) {
    log(
      `workspaceFolders: ${parameters.workspaceFolders.map((folder) => folder.name).join(', ')}`
    );
  }

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      definitionProvider: true,
      referencesProvider: true,
      hoverProvider: true,
      completionProvider: {
        triggerCharacters: ['"', "'", '`', '.'],
        resolveProvider: false,
      },
    },
  };
});

connection.onDefinition(async (parameters) => {
  const uri = parameters.textDocument.uri;
  const absolutePath = decodeURIComponent(new URL(uri).pathname);
  const position = parameters.position;
  const document = documents.get(uri);

  if (!document) {
    log(`onDefinition — document not found in cache: ${uri}`);
    return null;
  }

  const text = document.getText();
  const offset = document.offsetAt(position);
  const shortenedUri = uri
    .replace(/^file:\/\//, '')
    .split('/')
    .slice(-2)
    .join('/');

  log(`onDefinition — ${shortenedUri} ${position.line}:${position.character}`);
  const config = getProjectConfig(absolutePath);

  if (config && isContentFile(uri, config)) {
    // Content-file → component navigation is handled exclusively by the VS Code
    // extension's intlayerContentDefinitionProvider (which returns DefinitionLink[]
    // with a proper originSelectionRange). Returning null here prevents the LSP
    // from emitting a duplicate set of Location[] results for the same request.
    log('onDefinition — content file: delegating to extension provider');
    return null;
  }

  // Cursor on the key string / function name → navigate to content declaration.
  const key = findKeyAtOffset(text, offset);

  if (key) {
    log(
      `onDefinition — useIntlayer key: "${key}" → searching content declarations`
    );
    const locations = await getContentDeclarationLocations(key, absolutePath);
    log(
      `onDefinition — found ${locations.length} content declaration(s) for key "${key}"`
    );
    return locations.length ? locations : null;
  }

  // Cursor on a destructured property or member access property from useIntlayer
  // e.g. const { localeSwitcherLabel } = useIntlayer("locale-switcher")
  //                ^^^^^^^^^^^^^^^^^^  ← cursor here
  // e.g. t.localeSwitcherLabel  where  const t = useIntlayer("locale-switcher")
  const usageField = findUsageFieldAtOffset(text, offset);

  if (usageField) {
    log(
      `onDefinition — usage field: "${usageField.dictionaryKey}.${usageField.fieldName}" → searching content field`
    );
    const locations = await getContentFieldLocations(
      usageField.dictionaryKey,
      usageField.fieldName,
      absolutePath
    );
    log(
      `onDefinition — found ${locations.length} content file(s) with field "${usageField.fieldName}"`
    );
    return locations.length ? locations : null;
  }

  log('onDefinition — no Intlayer key at cursor, no result');
  return null;
});

/**
 * "Find All References" handler (Shift+F12).
 *
 * From a content file, returns every source-file location that uses the key or
 * field at the cursor — the reverse direction of Go-to-Definition.
 *
 * From a source file, returns all content-file declarations for the key or
 * field at the cursor — complementing what Go-to-Definition already handles.
 */
connection.onReferences(async (parameters: ReferenceParams) => {
  const uri = parameters.textDocument.uri;
  const absolutePath = decodeURIComponent(new URL(uri).pathname);
  const position = parameters.position;
  const document = documents.get(uri);

  if (!document) return null;

  const text = document.getText();
  const offset = document.offsetAt(position);
  const shortenedUri = uri
    .replace(/^file:\/\//, '')
    .split('/')
    .slice(-2)
    .join('/');

  log(`onReferences — ${shortenedUri} ${position.line}:${position.character}`);
  const config = getProjectConfig(absolutePath);

  if (config && isContentFile(uri, config)) {
    // Cursor on `key: "…"` → all useIntlayer(key) call sites
    const key = findKeyInContentFile(text, offset);

    if (key) {
      const locations = await getKeyUsageLocations(key, absolutePath);
      log(`onReferences — key "${key}" → ${locations.length} call site(s)`);
      return locations.length ? locations : null;
    }

    // Cursor on a content field → all field usage sites
    const extMatch = uri.match(/\.[^.]+$/);
    const ext = extMatch ? extMatch[0] : '';
    const fieldInfo = findContentFieldAtOffset(text, offset, ext);

    if (fieldInfo) {
      const locations = await getFieldUsageLocations(
        fieldInfo.dictionaryKey,
        fieldInfo.fieldPath,
        absolutePath
      );
      log(
        `onReferences — field "${fieldInfo.fieldPath.join('.')}" → ${locations.length} usage(s)`
      );
      return locations.length ? locations : null;
    }

    return null;
  }

  // Source file: key string → content-file declarations
  const key = findKeyAtOffset(text, offset);

  if (key) {
    const locations = await getContentDeclarationLocations(key, absolutePath);
    log(`onReferences — key "${key}" → ${locations.length} declaration(s)`);
    return locations.length ? locations : null;
  }

  // Source file: field property → content-file field definitions
  const usageField = findUsageFieldAtOffset(text, offset);

  if (usageField) {
    const locations = await getContentFieldLocations(
      usageField.dictionaryKey,
      usageField.fieldName,
      absolutePath
    );
    log(
      `onReferences — field "${usageField.fieldName}" → ${locations.length} content definition(s)`
    );
    return locations.length ? locations : null;
  }

  return null;
});

// ---------------------------------------------------------------------------
// Hover
// ---------------------------------------------------------------------------

connection.onHover(async (parameters: HoverParams): Promise<Hover | null> => {
  const uri = parameters.textDocument.uri;
  const absolutePath = decodeURIComponent(new URL(uri).pathname);
  const document = documents.get(uri);

  if (!document) return null;

  const text = document.getText();
  const offset = document.offsetAt(parameters.position);
  const config = getProjectConfig(absolutePath);

  if (!config) return null;

  const unmergedDictionaries = getUnmergedDictionariesCached(config);
  const getDicts = (key: string) =>
    Object.values(unmergedDictionaries)
      .flat()
      .filter((d) => d?.key === key);

  if (isContentFile(uri, config)) {
    // Cursor on `key: "..."` declaration
    const key = findKeyInContentFile(text, offset);

    if (key) {
      const dicts = getDicts(key);

      if (dicts.length > 0) {
        return {
          contents: {
            kind: MarkupKind.Markdown,
            value: formatDictionaryHover(dicts, key),
          },
        };
      }
    }

    // Cursor on a content field
    const ext = uri.match(/\.[^.]+$/)?.[0] ?? '';
    const fieldInfo = findContentFieldAtOffset(text, offset, ext);

    if (fieldInfo) {
      const dicts = getDicts(fieldInfo.dictionaryKey);

      if (dicts.length > 0) {
        const hoverText = formatFieldHover(
          dicts,
          fieldInfo.dictionaryKey,
          fieldInfo.fieldPath
        );

        if (hoverText) {
          return {
            contents: { kind: MarkupKind.Markdown, value: hoverText },
          };
        }
      }
    }

    return null;
  }

  // Source file: cursor on key string inside useIntlayer("key")
  const key = findKeyAtOffset(text, offset);

  if (key) {
    const dicts = getDicts(key);

    if (dicts.length > 0) {
      return {
        contents: {
          kind: MarkupKind.Markdown,
          value: formatDictionaryHover(dicts, key),
        },
      };
    }
    return null;
  }

  // Source file: cursor on a field property from useIntlayer result
  const usageField = findUsageFieldAtOffset(text, offset);

  if (usageField) {
    const dicts = getDicts(usageField.dictionaryKey);

    if (dicts.length > 0) {
      const hoverText = formatFieldHover(dicts, usageField.dictionaryKey, [
        usageField.fieldName,
      ]);

      if (hoverText) {
        return {
          contents: { kind: MarkupKind.Markdown, value: hoverText },
        };
      }
    }
  }

  return null;
});

// ---------------------------------------------------------------------------
// Completion
// ---------------------------------------------------------------------------

connection.onCompletion(
  async (parameters: CompletionParams): Promise<CompletionItem[] | null> => {
    const uri = parameters.textDocument.uri;
    const absolutePath = decodeURIComponent(new URL(uri).pathname);
    const document = documents.get(uri);

    if (!document) return null;

    const text = document.getText();
    const offset = document.offsetAt(parameters.position);
    const config = getProjectConfig(absolutePath);

    if (!config) return null;

    const program = parseText(text);
    const context = getCompletionContext(
      text.slice(0, offset),
      text.slice(offset),
      program
    );

    if (!context) return null;

    const unmergedDictionaries = getUnmergedDictionariesCached(config);

    if (context.kind === 'key') {
      const seen = new Set<string>();
      const items: CompletionItem[] = [];
      for (const dictionary of Object.values(unmergedDictionaries).flat()) {
        if (!dictionary?.key || seen.has(dictionary.key)) continue;

        seen.add(dictionary.key);
        items.push({
          label: dictionary.key,
          kind: CompletionItemKind.Value,
          detail: dictionary.title ?? undefined,
          documentation: dictionary.description
            ? { kind: MarkupKind.Markdown, value: dictionary.description }
            : undefined,
        });
      }
      log(`onCompletion — key: ${items.length} dictionary keys`);
      return items.length > 0 ? items : null;
    }

    if (context.kind === 'field') {
      const dictionaries = Object.values(unmergedDictionaries)
        .flat()
        .filter((dictionary) => dictionary?.key === context.dictionaryKey);

      if (dictionaries.length === 0) return null;

      const primary = dictionaries[0]!;
      const fields = getFieldsAtPath(primary.content, context.fieldPath);
      const items: CompletionItem[] = fields.map((fieldName) => {
        const value = getFieldByPath(primary.content, [
          ...context.fieldPath,
          fieldName,
        ]);
        return {
          label: fieldName,
          kind: CompletionItemKind.Field,
          detail: formatFieldValue(value),
        };
      });
      log(
        `onCompletion — field "${context.dictionaryKey}.${context.fieldPath.join('.')}": ${items.length} field(s)`
      );
      return items.length > 0 ? items : null;
    }

    return null;
  }
);

// ---------------------------------------------------------------------------
// Push diagnostics
// ---------------------------------------------------------------------------

documents.onDidOpen((event) => {
  sendDiagnosticsForDocument(
    event.document.uri,
    event.document.getText(),
    event.document.version
  );
});

documents.onDidChangeContent((event) => {
  scheduleDiagnostics(
    event.document.uri,
    event.document.getText(),
    event.document.version
  );
});

documents.onDidClose((event) => {
  const uri = event.document.uri;
  const timer = diagnosticTimers.get(uri);

  if (timer !== undefined) {
    clearTimeout(timer);
    diagnosticTimers.delete(uri);
  }
  connection.sendDiagnostics({ uri, diagnostics: [] });
});

// Invalidate the source-file list whenever the client reports a file change.
// The client registers a watcher for *.content.* files; any creation or
// deletion means the project layout may have changed.
connection.onDidChangeWatchedFiles(() => {
  invalidateConfigCaches();
  log(
    'watched files changed — source file list and dictionary cache invalidated'
  );
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
