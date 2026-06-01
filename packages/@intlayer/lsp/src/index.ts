#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { getConfiguration } from '@intlayer/config';
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

/**
 * Intlayer content getters that take a dictionary key as their first argument.
 * They are exported (under the same names) by every `*-intlayer` package, so we
 * only need to match the call name + the string-literal key to support all of:
 *   next-intlayer, react-intlayer, vue-intlayer, svelte-intlayer,
 *   preact-intlayer, solid-intlayer, angular-intlayer, lit-intlayer,
 *   express-intlayer, hono-intlayer, fastify-intlayer, adonis-intlayer, intlayer
 */
const INTLAYER_GETTERS = [
  'useIntlayer',
  'getIntlayer',
  'useDictionary',
  'getDictionary',
] as const;

// Matches e.g. `useIntlayer("homepage")`, `getIntlayer<T>('homepage', locale)`
// Capture group 3 is the dictionary key.
const buildGetterRegex = () =>
  new RegExp(
    `\\b(${INTLAYER_GETTERS.join('|')})\\b\\s*(?:<[^<>()]*>)?\\s*\\(\\s*(['"\`])([^'"\`]+)\\2`,
    'g'
  );

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let workspaceRoot: string | null | undefined;

/**
 * Resolve (and cache) the Intlayer configuration for the current workspace.
 * The LSP process cwd is not the project root, so we must resolve the config
 * from `workspaceRoot` to get the right `system`/`build` paths.
 */
let cachedConfig: Pick<IntlayerConfig, 'system' | 'build'> | null = null;
const getWorkspaceConfig = () => {
  if (cachedConfig) return cachedConfig;
  if (!workspaceRoot) return null;

  const { system, build } = getConfiguration({ baseDir: workspaceRoot });
  cachedConfig = { system, build };
  return cachedConfig;
};

/**
 * Return every `.content` file location that declares the given key.
 * A key can be split across several content files (merged dictionaries), so we
 * return one `Location` per source file, pointing at the `key:` declaration.
 */
const getContentDeclarationLocations = (key: string): Location[] => {
  const config = getWorkspaceConfig();
  if (!config) return [];

  const unmergedDictionaries = getUnmergedDictionaries(config);

  const dictionaries = Object.values(unmergedDictionaries)
    .flat()
    .filter((dictionary) => dictionary?.key === key && dictionary.filePath);

  const locations: Location[] = [];

  for (const dictionary of dictionaries) {
    const filePath = dictionary.filePath!;
    const absolutePath = isAbsolute(filePath)
      ? filePath
      : join(config.system.baseDir, filePath);

    if (!existsSync(absolutePath)) continue;

    locations.push(
      Location.create(
        pathToFileURL(absolutePath).href,
        getKeyRange(absolutePath, key)
      )
    );
  }

  return locations;
};

/** Find the `key: "<key>"` line inside a content file so the cursor lands on it. */
const getKeyRange = (absolutePath: string, key: string): Range => {
  try {
    const content = readFileSync(absolutePath, 'utf-8');
    const lines = content.split(/\r?\n/);
    const keyRegex = new RegExp(
      `key\\s*:\\s*['"\`]${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`
    );

    for (let line = 0; line < lines.length; line++) {
      const column = lines[line].search(keyRegex);
      if (column !== -1) {
        return Range.create(
          Position.create(line, column),
          Position.create(line, lines[line].length)
        );
      }
    }
  } catch {
    // fall through to the top of the file
  }

  return Range.create(Position.create(0, 0), Position.create(0, 0));
};

connection.onInitialize((params: InitializeParams): InitializeResult => {
  workspaceRoot =
    params.rootPath ||
    (params.workspaceFolders?.[0]?.uri
      ? decodeURIComponent(new URL(params.workspaceFolders[0].uri).pathname)
      : undefined);
  cachedConfig = null;

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      // Declare that this server provides "Go to Definition" support
      definitionProvider: true,
    },
  };
});

connection.onDefinition((params) => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return null;

  const text = document.getText();
  const offset = document.offsetAt(params.position);

  const regex = buildGetterRegex();

  for (const match of text.matchAll(regex)) {
    const start = match.index;
    const end = start + match[0].length;

    // Only resolve the call the cursor is actually inside of.
    if (offset >= start && offset <= end) {
      const key = match[3];
      const locations = getContentDeclarationLocations(key);
      return locations.length ? locations : null;
    }
  }

  return null;
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
