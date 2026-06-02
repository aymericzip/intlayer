#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, isAbsolute, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  FILE_EXTENSIONS,
  TRAVERSE_PATTERN,
} from '@intlayer/config/defaultValues';
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
import { findKeyAtOffset } from './findKeyAtOffset';
import { findKeyInContentFile } from './findKeyInContentFile';

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
      const column = lines[line]?.search(keyRegex);

      if (column && column !== -1 && lines[line]) {
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

// Source file extensions from the positive TRAVERSE_PATTERN entry
// e.g. '**/*.{tsx,ts,js,...}' → Set<'.tsx' | '.ts' | ...>
const SOURCE_EXTENSIONS: Set<string> = new Set(
  TRAVERSE_PATTERN.filter((pattern) => !pattern.startsWith('!')).flatMap(
    (pattern) => {
      const match = pattern.match(/\.\{([^}]+)\}/);

      return match?.[1] ? match[1].split(',').map((e) => `.${e.trim()}`) : [];
    }
  )
);

// Excluded directory names from '!**/name/**' negative patterns
const EXCLUDED_DIR_NAMES: Set<string> = new Set(
  TRAVERSE_PATTERN.filter((p) => /^!\*\*\/[^*/]+\/\*\*$/.test(p)).map((p) =>
    p.replace(/^!\*\*\//, '').replace(/\/\*\*$/, '')
  )
);

// File-level exclusion regexes from remaining negative patterns (e.g. '!**/*.test.*')
const FILE_EXCLUSION_RES: RegExp[] = TRAVERSE_PATTERN.filter(
  (pattern) => pattern.startsWith('!') && !/^!\*\*\/[^*/]+\/\*\*$/.test(pattern)
).map((pattern) => {
  const inner = pattern.replace(/^!(\*\*\/)*/, '');

  return new RegExp(
    `${inner.replace(/\./g, '\\.').replace(/\*/g, '[^\\/]*')}$`
  );
});

const isContentFile = (uri: string): boolean =>
  FILE_EXTENSIONS.some((ext) => uri.endsWith(ext));

const collectSourceFiles = (dir: string): string[] => {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!EXCLUDED_DIR_NAMES.has(entry.name)) {
          results.push(...collectSourceFiles(join(dir, entry.name)));
        }
      } else if (
        SOURCE_EXTENSIONS.has(extname(entry.name)) &&
        !isContentFile(entry.name) &&
        !FILE_EXCLUSION_RES.some((re) => re.test(entry.name))
      ) {
        results.push(join(dir, entry.name));
      }
    }
  } catch {
    // skip unreadable directories
  }
  return results;
};

/**
 * Return every source-file location that calls useIntlayer / getIntlayer with
 * the given key.
 */
const getKeyUsageLocations = (key: string): Location[] => {
  const config = getWorkspaceConfig();
  if (!config) return [];

  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const usageRegex = new RegExp(
    `\\b(?:useIntlayer|getIntlayer)\\b\\s*(?:<[^<>()]*>)?\\s*\\(\\s*(['"\`])${escapedKey}\\1`,
    'g'
  );

  const locations: Location[] = [];

  for (const filePath of collectSourceFiles(config.system.baseDir)) {
    try {
      const text = readFileSync(filePath, 'utf-8');
      for (const match of text.matchAll(usageRegex)) {
        const matchStart = match.index!;
        const matchEnd = matchStart + match[0].length;

        const beforeStart = text.slice(0, matchStart);
        const startLine = (beforeStart.match(/\n/g) ?? []).length;
        const startChar = matchStart - (beforeStart.lastIndexOf('\n') + 1);

        const beforeEnd = text.slice(0, matchEnd);
        const endLine = (beforeEnd.match(/\n/g) ?? []).length;
        const endChar = matchEnd - (beforeEnd.lastIndexOf('\n') + 1);

        locations.push(
          Location.create(
            pathToFileURL(filePath).href,
            Range.create(
              Position.create(startLine, startChar),
              Position.create(endLine, endChar)
            )
          )
        );
      }
    } catch {
      // skip unreadable files
    }
  }

  return locations;
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

  if (isContentFile(params.textDocument.uri)) {
    const key = findKeyInContentFile(text, offset);
    if (key) {
      const locations = getKeyUsageLocations(key);
      return locations.length ? locations : null;
    }
    return null;
  }

  const key = findKeyAtOffset(text, offset);

  if (key) {
    const locations = getContentDeclarationLocations(key);
    return locations.length ? locations : null;
  }

  return null;
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
