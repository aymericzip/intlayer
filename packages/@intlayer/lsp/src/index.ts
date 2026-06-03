#!/usr/bin/env node
import { type Dirent, existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { extname, isAbsolute, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { getConfiguration } from '@intlayer/config/node';
import type { IntlayerConfig } from '@intlayer/types/config';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import {
  createConnection,
  type InitializeParams,
  type InitializeResult,
  Location,
  Position,
  ProposedFeatures,
  Range,
  TextDocumentSyncKind,
  TextDocuments,
} from 'vscode-languageserver/node.js';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  escapeRegex,
  findFieldRangesInFile,
  offsetToRange,
} from './findFieldInFile';
import { findKeyAtOffset } from './findKeyAtOffset';
import {
  findContentFieldAtOffset,
  findKeyInContentFile,
} from './findKeyInContentFile';

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

type WorkspaceConfig = Pick<IntlayerConfig, 'system' | 'build' | 'content'>;

/**
 * Resolve (and cache) the Intlayer configuration for the current workspace.
 * The LSP process cwd is not the project root, so we must resolve the config
 * from `workspaceRoot` to get the right `system`/`build`/`content` paths.
 */
let cachedConfig: WorkspaceConfig | null = null;

/**
 * Cached unmerged dictionaries with a short TTL so that running
 * `intlayer build` during a session picks up without a full re-init.
 */
let cachedDictionaries: ReturnType<typeof getUnmergedDictionaries> | null =
  null;
let dictionariesCachedAt = 0;
const DICTIONARY_CACHE_TTL_MS = 5_000;

// Pattern-derived lookup structures — computed lazily from the live workspace
// config so they respect any user customisation of traversePattern /
// fileExtensions.
let cachedSourceExtensions: Set<string> | null = null;
let cachedExcludedDirs: Set<string> | null = null;
let cachedFileExclusionRegexes: RegExp[] | null = null;

/**
 * Cached list of source file paths.
 * Walking the directory tree is the dominant cost on every Go-to-Definition
 * from a content file. We cache the result for 30 s and re-scan only when
 * the client reports a watched-file change or the config is invalidated.
 */
let cachedSourceFiles: string[] | null = null;
let sourceFilesCachedAt = 0;
const SOURCE_FILES_CACHE_TTL_MS = 30_000;

const invalidateConfigCaches = () => {
  cachedConfig = null;
  cachedDictionaries = null;
  dictionariesCachedAt = 0;
  cachedSourceExtensions = null;
  cachedExcludedDirs = null;
  cachedFileExclusionRegexes = null;
  cachedSourceFiles = null;
  sourceFilesCachedAt = 0;
};

const getWorkspaceConfig = (): WorkspaceConfig | null => {
  if (cachedConfig) return cachedConfig;
  if (!workspaceRoot) {
    log('getWorkspaceConfig — no workspace root, skipping');
    return null;
  }
  try {
    log(`getWorkspaceConfig — loading config from: ${workspaceRoot}`);
    const { system, build, content } = getConfiguration({
      baseDir: workspaceRoot,
    });
    cachedConfig = { system, build, content };
    log(
      `getWorkspaceConfig — OK  baseDir=${system.baseDir}  unmergedDictionariesDir=${system.unmergedDictionariesDir}`
    );
    return cachedConfig;
  } catch (err) {
    log(`getWorkspaceConfig — FAILED: ${err}`);
    return null;
  }
};

const getUnmergedDictionariesCached = () => {
  const now = Date.now();
  if (
    cachedDictionaries &&
    now - dictionariesCachedAt < DICTIONARY_CACHE_TTL_MS
  ) {
    return cachedDictionaries;
  }
  const config = getWorkspaceConfig();
  if (!config) return {};
  cachedDictionaries = getUnmergedDictionaries(config);
  dictionariesCachedAt = now;
  return cachedDictionaries;
};

// ---------------------------------------------------------------------------
// Pattern helpers — derived lazily from the live config.
// ---------------------------------------------------------------------------

// Source file extensions from positive traversePattern entries
// e.g. '**/*.{tsx,ts,js,...}' → Set<'.tsx' | '.ts' | ...>
const getSourceExtensions = (): Set<string> => {
  if (cachedSourceExtensions) return cachedSourceExtensions;
  const traversePattern = getWorkspaceConfig()?.build.traversePattern ?? [];
  cachedSourceExtensions = new Set(
    traversePattern
      .filter((p) => !p.startsWith('!'))
      .flatMap((pattern) => {
        const m = pattern.match(/\.\{([^}]+)\}/);
        return m?.[1] ? m[1].split(',').map((e) => `.${e.trim()}`) : [];
      })
  );
  return cachedSourceExtensions;
};

// Excluded directory names from '!**/name/**' negative patterns
const getExcludedDirs = (): Set<string> => {
  if (cachedExcludedDirs) return cachedExcludedDirs;
  const traversePattern = getWorkspaceConfig()?.build.traversePattern ?? [];
  cachedExcludedDirs = new Set(
    traversePattern
      .filter((p) => /^!\*\*\/[^*/]+\/\*\*$/.test(p))
      .map((p) => p.replace(/^!\*\*\//, '').replace(/\/\*\*$/, ''))
  );
  return cachedExcludedDirs;
};

// File-level exclusion regexes from remaining negative patterns (e.g. '!**/*.test.*')
const getFileExclusionRegexes = (): RegExp[] => {
  if (cachedFileExclusionRegexes) return cachedFileExclusionRegexes;
  const traversePattern = getWorkspaceConfig()?.build.traversePattern ?? [];
  cachedFileExclusionRegexes = traversePattern
    .filter((p) => p.startsWith('!') && !/^!\*\*\/[^*/]+\/\*\*$/.test(p))
    .map((p) => {
      const inner = p.replace(/^!(\*\*\/)*/, '');
      return new RegExp(
        `${inner.replace(/\./g, '\\.').replace(/\*/g, '[^\\/]*')}$`
      );
    });
  return cachedFileExclusionRegexes;
};

const isContentFile = (uri: string): boolean => {
  const fileExtensions = getWorkspaceConfig()?.content.fileExtensions ?? [];
  return fileExtensions.some((ext) => uri.endsWith(ext));
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
 * Run `fn` over every item with at most `limit` tasks in-flight at once.
 * JS is single-threaded so `results.push` inside fn is race-free.
 */
const runConcurrent = async <T>(
  items: T[],
  fn: (item: T) => Promise<void>,
  limit = 50
): Promise<void> => {
  if (items.length === 0) return;
  let index = 0;
  const worker = async () => {
    while (index < items.length) {
      await fn(items[index++]!);
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker)
  );
};

/**
 * Recursively collect all source-file paths under `directory`.
 * Uses async readdir so it does not block the Node.js event loop.
 */
const collectSourceFiles = async (directory: string): Promise<string[]> => {
  const results: string[] = [];
  const sourceExtensions = getSourceExtensions();
  const excludedDirs = getExcludedDirs();
  const fileExclusionRegexes = getFileExclusionRegexes();
  const contentExts = getWorkspaceConfig()?.content.fileExtensions ?? [];

  const visit = async (dir: string): Promise<void> => {
    let entries: Dirent[];

    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }

    // Process entries concurrently within a single directory level.
    await Promise.all(
      entries.map(async (entry) => {
        if (entry.isDirectory()) {
          if (!excludedDirs.has(entry.name)) {
            await visit(join(dir, entry.name));
          }
        } else if (
          sourceExtensions.has(extname(entry.name)) &&
          !contentExts.some((ext) => entry.name.endsWith(ext)) &&
          !fileExclusionRegexes.some((re) => re.test(entry.name))
        ) {
          results.push(join(dir, entry.name));
        }
      })
    );
  };

  await visit(directory);
  return results;
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

    for (let line = 0; line < lines.length; line++) {
      const column = lines[line]?.search(keyRegularExpression);
      if (column !== undefined && column !== -1) {
        return Range.create(
          Position.create(line, column),
          Position.create(line, lines[line]!.length)
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
  key: string
): Promise<Location[]> => {
  const config = getWorkspaceConfig();
  if (!config) return [];

  const unmergedDictionaries = getUnmergedDictionariesCached();
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
const getSourceFiles = async (directory: string): Promise<string[]> => {
  const now = Date.now();
  if (
    cachedSourceFiles &&
    now - sourceFilesCachedAt < SOURCE_FILES_CACHE_TTL_MS
  ) {
    return cachedSourceFiles;
  }
  const t0 = Date.now();
  cachedSourceFiles = await collectSourceFiles(directory);
  sourceFilesCachedAt = Date.now();
  log(
    `source files scanned: ${cachedSourceFiles.length} file(s) in ${Date.now() - t0}ms`
  );
  return cachedSourceFiles;
};

/**
 * Return every source-file location that calls useIntlayer / getIntlayer with
 * the given key.
 */
const getKeyUsageLocations = async (key: string): Promise<Location[]> => {
  const config = getWorkspaceConfig();
  if (!config) return [];

  const usageRegularExpression = new RegExp(
    `\\b(?:useIntlayer|getIntlayer)\\b\\s*(?:<[^<>()]*>)?\\s*\\(\\s*(['"\`])${escapeRegex(key)}\\1`,
    'g'
  );

  const filePaths = await getSourceFiles(config.system.baseDir);
  const locations: Location[] = [];
  const t0 = Date.now();

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
    `getKeyUsageLocations("${key}") — ${filePaths.length} file(s) searched in ${Date.now() - t0}ms → ${locations.length} hit(s)`
  );
  return locations;
};

/**
 * Return every source-file location that accesses `fieldName` on the result
 * of `useIntlayer(dictionaryKey)` / `getIntlayer(dictionaryKey)`.
 */
const getFieldUsageLocations = async (
  dictionaryKey: string,
  fieldName: string
): Promise<Location[]> => {
  const config = getWorkspaceConfig();
  if (!config) return [];

  const escapedKey = escapeRegex(dictionaryKey);
  const escapedField = escapeRegex(fieldName);
  const useCallRegularExpression = new RegExp(
    `\\b(?:useIntlayer|getIntlayer)\\b(?:<[^<>()]*>)?\\s*\\(\\s*['"\`]${escapedKey}['"\`]`
  );

  const filePaths = await getSourceFiles(config.system.baseDir);
  const locations: Location[] = [];
  const t0 = Date.now();

  await runConcurrent(filePaths, async (filePath) => {
    const text = await tryReadFile(filePath);
    if (!text) return;
    // Two-stage pre-filter: string check then regex — skips most files cheaply
    if (!text.includes(dictionaryKey) || !text.includes(fieldName)) return;
    if (!useCallRegularExpression.test(text)) return;

    for (const range of findFieldRangesInFile(
      text,
      escapedKey,
      fieldName,
      escapedField
    )) {
      locations.push(Location.create(pathToFileURL(filePath).href, range));
    }
  });

  log(
    `getFieldUsageLocations("${dictionaryKey}.${fieldName}") — ${filePaths.length} file(s) searched in ${Date.now() - t0}ms → ${locations.length} hit(s)`
  );
  return locations;
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
      `workspaceFolders: ${parameters.workspaceFolders.map((f) => f.name).join(', ')}`
    );
  }

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      definitionProvider: true,
    },
  };
});

connection.onDefinition(async (parameters) => {
  const uri = parameters.textDocument.uri;
  const pos = parameters.position;
  const document = documents.get(uri);

  if (!document) {
    log(`onDefinition — document not found in cache: ${uri}`);
    return null;
  }

  const text = document.getText();
  const offset = document.offsetAt(pos);
  const shortUri = uri
    .replace(/^file:\/\//, '')
    .split('/')
    .slice(-2)
    .join('/');

  log(`onDefinition — ${shortUri} ${pos.line}:${pos.character}`);

  if (isContentFile(uri)) {
    log('onDefinition — detected content file');

    // Cursor on `key: "…"` → navigate to useIntlayer(key) call sites
    const key = findKeyInContentFile(text, offset);
    if (key) {
      log(`onDefinition — key declaration: "${key}" → searching call sites`);
      const locations = await getKeyUsageLocations(key);

      log(
        `onDefinition — found ${locations.length} call site(s) for key "${key}"`
      );
      return locations.length ? locations : null;
    }

    // Cursor on a content field (e.g. `greet`) → navigate to field usages
    const fieldInfo = findContentFieldAtOffset(text, offset);
    if (fieldInfo) {
      log(
        `onDefinition — field: "${fieldInfo.dictionaryKey}.${fieldInfo.fieldName}" → searching usages`
      );
      const locations = await getFieldUsageLocations(
        fieldInfo.dictionaryKey,
        fieldInfo.fieldName
      );
      log(
        `onDefinition — found ${locations.length} usage(s) for field "${fieldInfo.fieldName}"`
      );
      return locations.length ? locations : null;
    }

    log('onDefinition — cursor not on a key or field declaration, no result');
    return null;
  }

  const key = findKeyAtOffset(text, offset);

  if (key) {
    log(
      `onDefinition — useIntlayer key: "${key}" → searching content declarations`
    );
    const locations = await getContentDeclarationLocations(key);
    log(
      `onDefinition — found ${locations.length} content declaration(s) for key "${key}"`
    );
    return locations.length ? locations : null;
  }

  log('onDefinition — no Intlayer key at cursor, no result');
  return null;
});

// Invalidate the source-file list whenever the client reports a file change.
// The client registers a watcher for *.content.* files; any creation or
// deletion means the project layout may have changed.
connection.onDidChangeWatchedFiles(() => {
  cachedSourceFiles = null;
  sourceFilesCachedAt = 0;
  cachedDictionaries = null;
  dictionariesCachedAt = 0;
  log(
    'watched files changed — source file list and dictionary cache invalidated'
  );
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
